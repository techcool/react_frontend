import React from 'react';
import { BLUE } from 'common/src/constants';
const Checkmark = ({ 
	style = {},
	backgroundColor = BLUE
 }) =>
	<svg
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		x="0px"
		y="0px"
		viewBox="0 0 54.2 48.4"
		style={{
			enableBackground: "new 0 0 54.2 48.4;",
			backgroundColor,
			borderRadius: '50%',
			...style
		}}
		xmlSpace="preserve">
		{/* <path className="st0" d="M27.1,47.6c-12.9,0-23.3-10.5-23.3-23.3C3.8,11.4,14.3,1,27.1,1C40,1,50.4,11.5,50.4,24.3	C50.5,37.1,40,47.6,27.1,47.6z M27.1,5.9C17,5.9,8.8,14.1,8.8,24.2S17,42.5,27.1,42.5s18.3-8.2,18.3-18.3	C45.5,14.1,37.2,5.9,27.1,5.9z" /> */} 
		<path className="st0" style={{ fill: 'white' }} d="M24.3,39c-0.2,0.3-0.6,0.3-0.9,0L11.7,25.3c-0.3-0.3-0.2-0.7,0.1-1l2.7-2.3c0.3-0.3,0.7-0.2,1,0.1l7.7,9.1	c0.3,0.3,0.7,0.3,0.9,0l13.3-16.9c0.2-0.3,0.7-0.4,1-0.2l2.8,2.2c0.3,0.2,0.4,0.7,0.2,1L24.3,39z" />
	</svg>
export default Checkmark;