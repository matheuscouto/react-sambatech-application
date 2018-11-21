import * as React from 'react';
import { mount, configure } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import { ScaleLoader } from 'react-spinners';

import VideoItem from '../components/VideoList/VideoItem';

configure({ adapter: new Adapter() });

describe("VideoItem", () => {
  let props: {
    onSelectVideo: () => void,
    title: string,
    status: string,
    thumbnails?: string[],
    arquiveVideo: (videoTitle: string) => () => void,
    editVideoTitle: (videoTitle: string) => () => void,
  };
  let mountedVideoItem:any;
  const videoItem = () => {
    if (!mountedVideoItem) {
      mountedVideoItem = mount(
          <VideoItem {...props} />
      );
    }
    return mountedVideoItem;
  }

  beforeEach(() => {
    props = {
      onSelectVideo: jest.fn(),
      title: 'my title',
      status: 'encoding',
      thumbnails: undefined,
      arquiveVideo: jest.fn(),
      editVideoTitle: jest.fn(),
    };
    mountedVideoItem = undefined;
  });

  it("passes `title` to last rendered `p` as `children`", () => {
    const lastP = videoItem().find('p').last();
    expect(lastP.props().children).toBe(props.title);
  })

  describe("when `status` is 'done'", () => {
    beforeEach(() => {
      props.status = 'done';
    });

    it("renders 3 `div`s", () => {
      const divs = videoItem().find("div");
      expect(divs.length).toBe(3);
    });

    it("renders a `img`", () => {
      const imgs = videoItem().find("img");
      expect(imgs.length).toBe(1);
    });
  });

  describe("when `status` is 'encoding'", () => {
    beforeEach(() => {
      props.status = 'encoding';
    });

    it("renders a spinner", () => {
      const divs = videoItem().find(ScaleLoader);
      expect(divs.length).toBe(1);
    });

    it("shouldn't render a `img`", () => {
      const imgs = videoItem().find("img");
      expect(imgs.length).toBe(0);
    });

    it("passes `status` to first rendered `p` as `children`", () => {
      const firstP = videoItem().find('p').first();
      expect(firstP.props().children).toBe(props.status);
    })
  });

  describe("when `status` is 'uploading'", () => {
    beforeEach(() => {
      props.status = 'uploading';
    });

    it("renders a spinner", () => {
      const divs = videoItem().find(ScaleLoader);
      expect(divs.length).toBe(1);
    });

    it("shouldn't render a `img`", () => {
      const imgs = videoItem().find("img");
      expect(imgs.length).toBe(0);
    });

    it("passes `status` to first rendered `p` as `children`", () => {
      const firstP = videoItem().find('p').first();
      expect(firstP.props().children).toBe(props.status);
    })
  });

  it("shows user a menu onMouseOver the thumbnail and hides onMouseLeave", () => {
    const wrapper = videoItem().find("div").at(1);
    wrapper.simulate("mouseleave");
    expect(videoItem().find("div").at(2).props().style).toHaveProperty('opacity', 0)
    wrapper.simulate("mouseenter");
    expect(videoItem().find("div").at(2).props().style).toHaveProperty('opacity', 1)
  })
});
