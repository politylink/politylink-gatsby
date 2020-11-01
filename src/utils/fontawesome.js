import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faArrowCircleRight,
  faLock,
  faExternalLinkAlt,
  faUser,
  faCalendarAlt,
  faAngleDoubleLeft,
  faAngleDoubleRight
} from "@fortawesome/free-solid-svg-icons";

// Prevent fontawesome from dynamically adding its css since
// we do it in gatsby-browser / gatsby-ssr.
config.autoAddCss = false;

library.add(
  fab,
  faArrowCircleRight,
  faLock,
  faExternalLinkAlt,
  faUser,
  faCalendarAlt,
  faAngleDoubleLeft,
  faAngleDoubleRight
);