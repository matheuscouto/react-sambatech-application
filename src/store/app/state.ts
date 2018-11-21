import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { filter, mergeMap, map, catchError, debounceTime } from 'rxjs/operators'
import { of } from 'rxjs';
import { uploadFiles$ } from 'src/services/api';
import { Epic, Selector } from '..';

// ACTIONS

const actionCreator = actionCreatorFactory('APP::STATE');
export const init = actionCreator('INIT');
export const uploadFiles = actionCreator.async<FormData, undefined, any>('UPLOAD_FILES');
export const updateUploadFilesProgress = actionCreator<number>('UPDATE_UPLOAD_PROGRESS');

// STATE

export interface IState {
	initialized: boolean;
	uploadProgress?: number;
}

const INITIAL_STATE: IState = {
	initialized: false,
};

export const selectUploadProgress: Selector<number | undefined> = ({ appState }) => appState.uploadProgress;
// REDUCER

export default reducerWithInitialState(INITIAL_STATE)
	.case(init, (state: IState) => ({
		...state,
		initialized: true,
	}))
	.case(updateUploadFilesProgress, (state: IState, uploadProgress) => ({
		...state,
		uploadProgress,
	}))
	.case(uploadFiles.done, (state: IState) => ({
		...state,
		uploadProgress: 100,
	}))
	.build();

// EFFECTS

const uploadFilesEpic: Epic = (action$) => action$.pipe(
	filter(uploadFiles.started.match),
	mergeMap(({ payload: formData }) => uploadFiles$(formData).pipe(
		debounceTime(100),
		map((progress) => {
			if(progress === 100) {
				return uploadFiles.done({ params: formData })
			}
			return updateUploadFilesProgress(progress)
		}),
		catchError((error) => of(uploadFiles.failed({ params: formData, error }))),
	)),
);

export const epics = combineEpics(
	uploadFilesEpic
);
