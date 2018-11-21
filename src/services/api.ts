import axios from 'axios';
import { Observable } from 'rxjs';

export let cancelUpload: () => void;

//	Using rxjs I create and Observable from the request
//	that provides the uploadProgress on every change.
//
//	I'm using redux-observable lib to handle this request
//	and serve this information to whatever component that
//	wants to make use of it.

export function uploadFiles$(formData: FormData): Observable<number> {
	const CancelToken = axios.CancelToken;
	const source = CancelToken.source();
	cancelUpload = source.cancel;
	return new Observable((observer) => {
		axios.post('http://52.91.35.47:3000/upload', formData, {
			cancelToken: source.token,
			headers: { 'content-type': 'multipart/form-data' },
			onUploadProgress: (progress) => {
				observer.next(progress.loaded * 100 / progress.total)
			}
		}).catch((err) => {
			observer.error(err)
		}).then(() => {
			observer.complete()
		})
		return source.cancel
	})	
}
