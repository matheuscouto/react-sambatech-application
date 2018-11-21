import * as React from 'react';
import { mount, configure } from "enzyme";
import * as Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { navItemTransitions } from '../components/Navbar/style';
import { Navbar } from '../components';

configure({ adapter: new Adapter() });

describe("Navbar", () => {
  let props:{ location: string };
  let mountedNavbar:any;
  const navbar = () => {
    if (!mountedNavbar) {
      mountedNavbar = mount(
        <Router>
          <Navbar {...props} />
        </Router>
      );
    }
    return mountedNavbar;
  }

  beforeEach(() => {
    props = {
      location: '/'
    };
    mountedNavbar = undefined;
  });

  it("always renders a div", () => {
    const divs = navbar().find("div");
    expect(divs.length).toBeGreaterThan(0);
  });

  it("always renders two React Router `Link`", () => {
    expect(navbar().find(Link).length).toBe(2);
  });

  describe("when `location` is `/`", () => {
    beforeEach(() => {
      props.location = '/';
    });
  
    it("sets the first rendered `Link`'s `style` prop to the same value as `navItemTransitions.selected`", () => {
      const uploadNavItem = navbar().find(Link).first();
      expect(uploadNavItem.props().style).toBe(navItemTransitions.selected);
    });
  
    it("sets the second rendered `Link`'s `style` prop to the same value as `navItemTransitions.default`", () => {
      const videosNavItem = navbar().find(Link).at(1);
      expect(videosNavItem.props().style).toBe(navItemTransitions.default);
    });
  });

  describe("when `location` is `/videos`", () => {
    beforeEach(() => {
      props.location = '/videos';
    });
  
    it("sets the first rendered `Link`'s `style` prop to the same value as `navItemTransitions.default`", () => {
      const uploadNavItem = navbar().find(Link).first();
      expect(uploadNavItem.props().style).toBe(navItemTransitions.default);
    });
  
    it("sets the second rendered `Link`'s `style` prop to the same value as `navItemTransitions.selected`", () => {
      const videosNavItem = navbar().find(Link).at(1);
      expect(videosNavItem.props().style).toBe(navItemTransitions.selected);
    });
  });

  describe("when user goes direct to the video link and location is `/videos/:id`", () => {
    beforeEach(() => {
      props.location = '/videos/-LRnOEDvy3B3mXKuClER';
    });
  
    it("sets the first rendered `Link`'s `style` prop to the same value as `navItemTransitions.default`", () => {
      const uploadNavItem = navbar().find(Link).first();
      expect(uploadNavItem.props().style).toBe(navItemTransitions.default);
    });
  
    it("sets the second rendered `Link`'s `style` prop to the same value as `navItemTransitions.selected`", () => {
      const videosNavItem = navbar().find(Link).at(1);
      expect(videosNavItem.props().style).toBe(navItemTransitions.default);
    });
  });
});