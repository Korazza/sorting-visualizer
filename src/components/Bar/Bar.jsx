import React, { useState, useRef, useEffect } from 'react';
import './Bar.scss';

const Bar = ({ width, height, comparing, swapping, sorted }) => {
	const [className, setClassName] = useState('');
	const [content, setContent] = useState('');
	const [style, setStyle] = useState();
	const div = useRef();

	useEffect(() => {
		let widthStyle = `${width}px`;
		if (height) {
			let heightStyle = `${height}px`;
			setStyle({
				width: widthStyle,
				height: heightStyle,
			});
		}
	}, [width, height]);

	useEffect(() => {
		if (height) setContent(`${height}`);
	}, [content, height]);

	useEffect(() => {
		let classes = '';
		if ((comparing || swapping) && width >= 30) classes += ' mx';
		if (comparing) classes += ' comparing';
		if (swapping) classes += ' swapping';
		if (sorted) classes += ' sorted';
		setClassName(classes);
	}, [width, comparing, swapping, sorted]);

	return (
		<div ref={div} style={style} className={'bar' + className}>
			{width >= 30 && content}
		</div>
	);
};

export default Bar;
