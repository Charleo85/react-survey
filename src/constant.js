import React from 'react';

export const scaleDescription = [
	'Not at all',
	'slightly',
	'somewhat',
	'very',
	'Extremely'
];

export const types = ['title', 'text', 'topic'];

export const typeDescription = (type) => {
	switch (type) {
		case 'title':
			return (<Title/>);
		case 'text':
			return (<TextSnippet/>);
		case 'topic':
			return (<Topic/>);
		default:
			return null;
	}
};

export const stepDescription = [
  'Select the article of your interest',
  'Feedback on your choice',
  'Impression of the articles'
];

export const Bullet = () => (
  <span style={{color: '#0091EA'}}>* </span>
);

export const Title = () => (
  <span style={{color: '#4FC3F7', fontWeight:'400'}}>title</span>
);

export const TextSnippet = () => (
  <span style={{color: '#81C784', fontWeight:'400'}}>text snippet</span>
);

export const Topic = () => (
  <span style={{color: '#FFCC80', fontWeight:'400'}}>topic</span>
);

export const QuestionText1 = 'Will you click and read more of this article?'
export const QuestionText3 = 'Did this text snippet appear on Page 1?'
