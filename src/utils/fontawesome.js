import {config, library} from '@fortawesome/fontawesome-svg-core';
import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleDown,
    faAngleUp,
    faArrowCircleRight,
    faCalendarAlt,
    faExternalLinkAlt,
    faLock,
    faPlus,
    faUser,
    faMicrophone,
    faStickyNote,
    faFilePdf,
    faVideo
} from "@fortawesome/free-solid-svg-icons";

// Prevent fontawesome from dynamically adding its css since
// we do it in gatsby-browser / gatsby-ssr.
config.autoAddCss = false;

library.add(
    faArrowCircleRight,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faCalendarAlt,
    faExternalLinkAlt,
    faLock,
    faPlus,
    faUser,
    faAngleDown,
    faAngleUp,
    faMicrophone,
    faStickyNote,
    faFilePdf,
    faVideo
);