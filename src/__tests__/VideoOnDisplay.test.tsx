import * as React from 'react';
import { mount, configure } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import { VideoOnDisplay } from '../components/VideoOnDisplay';

configure({ adapter: new Adapter() });

/* ************************* */
//      VIDEO ON DISPLAY     //
/* ************************* */

describe("VideoOnDisplay", () => {
  let props: {
    videoOnDisplay?: {url: string, id: string};
  };
  let mountedVideoOnDisplay:any;
  const videoOnDisplay = () => {
    if (!mountedVideoOnDisplay) {
      mountedVideoOnDisplay = mount(
          <VideoOnDisplay {...props} />
      );
    }
    return mountedVideoOnDisplay;
  }

  beforeEach(() => {
    props = {
      videoOnDisplay: undefined
    };
    mountedVideoOnDisplay = undefined;
  });
  
  describe("when `videoOnDisplay` is defined", () => {
    beforeEach(() => {
      props.videoOnDisplay = { url: 'www.my.video.com', id: '8fj308j20grsg' };
    });

    it("sets the rendered wrapping `div`'s `style` prop to match height 'calc(733px*9/16)' and marginBottom '60'", () => {
      const wrappingDiv = videoOnDisplay().find("div").first();
      expect(wrappingDiv.props().style).toMatchObject({ height: 'calc(733px*9/16)', marginBottom: 60 });
    });

    it("renders a HTML5 video tag", () => {
      const videos = videoOnDisplay().find("video");
      expect(videos.length).toBe(1);
    });
  });

  describe("when `videoOnDisplay` is undefined", () => {
    beforeEach(() => {
      props.videoOnDisplay = undefined;
    });

    it("sets the rendered wrapping `div`'s `style` prop to match height '0' and marginBottom '0'", () => {
      const wrappingDiv = videoOnDisplay().find("div").first();
      expect(wrappingDiv.props().style).toMatchObject({ height: 0, marginBottom: 0 });
    });

    it("does not render a HTML5 video tag", () => {
      const videos = videoOnDisplay().find("video");
      expect(videos.length).toBe(0);
    });
  });
})
