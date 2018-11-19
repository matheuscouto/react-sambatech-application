import * as React from 'react';
import styles from './styles';

import { ScaleLoader } from 'react-spinners';

interface IVideoItemState {
	thumbnailHoover: React.CSSProperties;
}

interface IVideoItemProps {
	onSelectVideo: () => void,
	title: string,
	status: string,
	thumbnails?: string[],
}

class VideoItem extends React.PureComponent<IVideoItemProps, IVideoItemState> {
	public state = {
		thumbnailHoover: styles.thumbnailHoover
	}

	public render () {
		const { thumbnailHoover } = this.state;
		const { onSelectVideo, title, status, thumbnails } = this.props;
		return (
			<div style={styles.videoItemWrapper} onClick={status === 'done' ? onSelectVideo : undefined}>
				<div style={styles.thumbnail} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
					<div style={thumbnailHoover} />
					{
						status==='encoding' && 
						<div style={styles.encoding}>
							<p style={styles.encodingLabel}>encoding</p>
							<ScaleLoader loading 
								height={35}
								heightUnit="px"
								width={4}
								widthUnit="px"
								radius={2}
								radiusUnit="px"
								margin="2px"
								color="rgb(68, 68, 68)"
							/>
						</div>
					}
					{
						status==='done' &&
						<img style={styles.thumbnailImage} src={thumbnails ? thumbnails[0] : undefined} />
					}
				</div>
				<p style={styles.title}>{title}</p>
			</div>
		)
	}

	private onMouseEnter = () => {
		this.setState(state => ({
			...state,
			thumbnailHoover: {
				...state.thumbnailHoover,
				width: '30%',
			}
		}))
	}

	private onMouseLeave = () => {
		this.setState(state => ({
			...state,
			thumbnailHoover: {
				...state.thumbnailHoover,
				width: '0',
			}
		}))
	}
}

export default VideoItem;