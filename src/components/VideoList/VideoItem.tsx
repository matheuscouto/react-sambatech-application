import * as React from 'react';
import styles from './styles';
import { IoMdTrash } from 'react-icons/io';

import { ScaleLoader } from 'react-spinners';

interface IVideoItemState {
	thumbnailHoover: React.CSSProperties;
}

interface IVideoItemProps {
	onSelectVideo: () => void,
	title: string,
	status: string,
	thumbnails?: string[],
	arquiveVideo: (videoTitle: string) => () => void,
	editVideoTitle: (videoTitle: string) => () => void,
}

class VideoItem extends React.PureComponent<IVideoItemProps, IVideoItemState> {
	public state = {
		thumbnailHoover: styles.thumbnailHoover,
	}

	public render () {
		const { thumbnailHoover } = this.state;
		const { onSelectVideo, title, status, thumbnails, arquiveVideo, editVideoTitle } = this.props;
		return (
			<div style={styles.videoItemWrapper}>
				<div style={styles.thumbnail} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
					<div style={thumbnailHoover}>
						<IoMdTrash color="white" size={23} style={styles.thumbnailHooverIcons} onClick={arquiveVideo(title)} />
						<FaEdit color="white" size={18} style={styles.thumbnailHooverIcons} onClick={editVideoTitle(title)} />
					</div>
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
			}
		}))
	}
}

export default VideoItem;