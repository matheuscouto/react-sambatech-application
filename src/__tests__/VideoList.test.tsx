import * as React from 'react';
import { shallow, configure } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import { VideoList } from '../components/VideoList';
import VideoLoader from '../components/VideoList/VideoLoader';

configure({ adapter: new Adapter() });

describe("VideoList", () => {
  let props:{
    videoIdToDisplay?: string;
    pushHistory: (path: string) => void;
    videoOnDisplay?: {url: string, id: string};
    putVideoOnDisplay: (url: string, id: string) => void;
    removeVideoFromDisplay: () => void;
  };

  beforeEach(() => {
    props = {
      videoIdToDisplay: undefined,
      pushHistory: jest.fn(),
      videoOnDisplay: undefined,
      putVideoOnDisplay: jest.fn(),
      removeVideoFromDisplay: jest.fn(),
    };
  });

  it("shows `VideoLoader` component when state `isLoadingVideos` is true", () => {
    const wrapper = shallow(<VideoList {...props} />);
    expect(wrapper.find(VideoLoader).length).toBe(1)
    wrapper.setState((state: any) => ({...state, isLoadingVideos: false }))
    expect(wrapper.find(VideoLoader).length).toBe(0)
  });

  it("sets state `isArquivingVideo` to `true` when component `isLoadingVideos` is true", () => {
    const wrapper = shallow(<VideoList {...props} />);
    expect(wrapper.find(VideoLoader).length).toBe(1)
    wrapper.setState((state: any) => ({...state, isLoadingVideos: false }))
    expect(wrapper.find(VideoLoader).length).toBe(0)
  });
});