import * as React from 'react';
import styles from './styles';
import { IoMdTrash, IoIosPlayCircle } from 'react-icons/io';
import { FaEdit } from 'react-icons/fa';

import { ScaleLoader } from 'react-spinners';

interface IVideoItemState {
	thumbnailHoover: React.CSSProperties;
	playHoover: React.CSSProperties;
}

interface IVideoItemProps {
	onSelectVideo: () => void,
	title: string,
	status: string,
	thumbnails?: string[],
	arquiveVideo: (videoTitle: string) => () => void,
	editVideoTitle: (videoTitle: string) => () => void,
}

//  COMPONENT: VideoItem
//  ROLE: Renders a single video placeholder showing it's current status.
//
//	Also allow the user to arquive the video or update it's current title
//	using the methods `arquiveVideo` and `editVideoTitle` provided by the VideoList component.
//	And last, permit the user to choose a single video to play at VideoOnDisplay component.

class VideoItem extends React.PureComponent<IVideoItemProps, IVideoItemState> {
	public state = {
		thumbnailHoover: styles.thumbnailHoover,
		playHoover: styles.playHoover,
	}

	public render () {
		const { thumbnailHoover, playHoover} = this.state;
		const { onSelectVideo, title, status, thumbnails, arquiveVideo, editVideoTitle } = this.props;
		return (
			<div style={styles.videoItemWrapper}>
				<div style={styles.thumbnail} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
					<IoIosPlayCircle color="white" size={40} style={playHoover} onClick={status==='done' ? onSelectVideo : undefined} />
					<div style={thumbnailHoover}>
						<IoMdTrash color="white" size={23} style={styles.thumbnailHooverIcons} onClick={arquiveVideo(title)} />
						<FaEdit color="white" size={18} style={styles.thumbnailHooverIcons} onClick={editVideoTitle(title)} />
					</div>
					{
						(status==='encoding' || status==='uploading') && 
						<div style={styles.encoding}>
							<p style={styles.encodingLabel}>{status}</p>
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
						<img style={styles.thumbnailImage} src={thumbnails ? thumbnails[0] : undefined} onClick={onSelectVideo} />
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
				opacity: 1
			},
			playHoover: {
				...state.playHoover,
				opacity: this.props.status==='done' ? 1 : 0,
			}
		}))
	}

	private onMouseLeave = () => {
		this.setState(state => ({
			...state,
			thumbnailHoover: {
				...state.thumbnailHoover,
				width: '0',
				opacity: 0
			},
			playHoover: {
				...state.playHoover,
				opacity: 0,
			}
		}))
	}
}

export default VideoItem;