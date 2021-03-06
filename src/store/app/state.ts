import { combineEpics } from 'redux-observable';
import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers/dist';
import { filter, mergeMap, map, catchError, debounceTime } from 'rxjs/operators'
import { of } from 'rxjs';
import { uploadFiles$ } from '../../services/api';
import { Epic, Selector } from '..';

/* **************** */
//      ACTIONS     //
/* **************** */

// I use typescript-fsa to provide easily type-safe action creation

const actionCreator = actionCreatorFactory('APP::STATE');
export const init = actionCreator('INIT');
export const uploadFiles = actionCreator.async<FormData, undefined, any>('UPLOAD_FILES');
export const updateUploadFilesProgress = actionCreator<number>('UPDATE_UPLOAD_PROGRESS');
export const resetUpload = actionCreator('RESET_UPLOAD_UI');
export const putVideoOnDisplay = actionCreator<{url: string, id: string}>('PUT_VIDEO_ON_DISPLAY')
export const removeVideoFromDisplay = actionCreator('REMOVE_VIDEO_FROM_DISPLAY');

/* ********************** */
//      INITIAL STATE     //
/* ********************** */

export interface IState {
	initialized: boolean;
	uploadProgress?: number;
	videoOnDisplay?: {
		url: string,
		id: string,
	}
}

const INITIAL_STATE: IState = {
	initialized: false,
};

/* ****************** */
//      SELECTORS     //
/* ****************** */

// The selectors provide an optmized way to retreive informations from the store

export const selectUploadProgress: Selector<number | undefined> = ({ appState }) => appState.uploadProgress;
export const selectSelectVideoOnDisplay: Selector<{url: string, id: string} | undefined> = ({ appState }) => appState.videoOnDisplay;

/* **************** */
//      REDUCER     //
/* **************** */

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
	.case(resetUpload, (state: IState) => ({
		...state,
		uploadProgress: undefined,
	}))
	.case(putVideoOnDisplay, (state: IState, videoOnDisplay) => ({
		...state,
		videoOnDisplay,
	}))
	.case(removeVideoFromDisplay, (state: IState) => ({
		...state,
		videoOnDisplay: undefined,
	}))
	.build();

/* **************** */
//      EFFECTS     //
/* **************** */

// 	To handle async requests I use redux-observable, so every action creates a rxjs Observable.
// 	Throw the Epic I can pipe this action and use all rxjs resources. In this case I'm starting
//	the upload request and listening to the uploadProgress to provide it to the whole application.
//	When it's done, it dispatches the uploadFiles.done action.

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
