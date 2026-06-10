// Central GSAP entry. Import only what you need from here.
// All plugins (including the formerly Club GSAP plugins) are free
// for everyone (including commercial use) thanks to Webflow.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export { gsap, ScrollTrigger, SplitText };
