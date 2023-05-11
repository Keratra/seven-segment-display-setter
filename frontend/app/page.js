'use client';

import { useState } from 'react';

export default function Home() {
	const [value, setValue] = useState('0000000');
	const [values, setValues] = useState({
		0: '0',
		1: '0',
		2: '0',
		3: '0',
		4: '0',
		5: '0',
		6: '0',
	});

	const handlePress = (e) => {
		try {
			const v = e.target.value;

			if (values[v] === '0') {
				setValues({ ...values, [v]: '1' });
			} else if (values[v] === '1') {
				setValues({ ...values, [v]: '0' });
			} else {
				throw Error('Unexpected value in values');
			}

			setValue(() => getLastSevenDigits(value + v));
		} catch (error) {
			console.log(error);
		}
	};

	const getLastSevenDigits = (num) => {
		const v = num.split('');
		const res = v.slice(-7).join('');
		return res;
	};

	// PLACEMENTS
	//      0
	//     ---
	// 	5	|		| 1
	// 		|	6	|
	//     ---
	// 	4	|		| 2
	// 		|	3	|
	//     ---

	// px-4 py-2 m-2
	const classButton = ` 
		
		
		text-2xl font-bold
		shadow-md rounded-full
		font-["Consolas"] 
	`;

	const classBtnPressed = 'bg-red-400';
	const classBtnUnpressed = 'bg-zinc-100';

	const classBtnHor = `
		w-40 h-16 mx-auto 
	`;

	const classBtnVer = `
		h-28 w-16
	`;

	return (
		<main className='flex min-h-screen flex-col items-center justify-start p-12 '>
			<h2>History</h2>
			<div className='px-4 py-2 m-2 mb-12 text-2xl bg-white text-black shadow-md rounded-md font-["Consolas"]'>
				{value}
			</div>
			<div className='max-w-[20rem] grid grid-cols-3 place-items-center p-2 w-full'>
				{/* <div className='col-span-1'></div> */}
				<button
					onClick={handlePress}
					value={'0'}
					className={
						classButton +
						classBtnHor +
						' col-span-3 ' +
						` ${values['0'] === '1' ? classBtnPressed : classBtnUnpressed} `
					}
				></button>
				{/* <div className='col-span-1'></div> */}

				<button
					onClick={handlePress}
					value={'5'}
					className={
						classButton +
						classBtnVer +
						' col-span-1 ' +
						` ${values['5'] === '1' ? classBtnPressed : classBtnUnpressed} `
					}
				></button>
				<div className='col-span-1'></div>
				<button
					onClick={handlePress}
					value={'1'}
					className={
						classButton +
						classBtnVer +
						' col-span-1 ' +
						` ${values['1'] === '1' ? classBtnPressed : classBtnUnpressed} `
					}
				></button>

				{/* <div className='col-span-1'></div> */}
				<button
					onClick={handlePress}
					value={'6'}
					className={
						classButton +
						classBtnHor +
						' col-span-3 ' +
						` ${values['6'] === '1' ? classBtnPressed : classBtnUnpressed} `
					}
				></button>
				{/* <div className='col-span-1'></div> */}

				<button
					onClick={handlePress}
					value={'4'}
					className={
						classButton +
						classBtnVer +
						' col-span-1 ' +
						` ${values['4'] === '1' ? classBtnPressed : classBtnUnpressed} `
					}
				></button>
				<div className='col-span-1'></div>
				<button
					onClick={handlePress}
					value={'2'}
					className={
						classButton +
						classBtnVer +
						' col-span-1 ' +
						` ${values['2'] === '1' ? classBtnPressed : classBtnUnpressed} `
					}
				></button>

				{/* <div className='col-span-1'></div> */}
				<button
					onClick={handlePress}
					value={'3'}
					className={
						classButton +
						classBtnHor +
						' col-span-3 ' +
						` ${values['3'] === '1' ? classBtnPressed : classBtnUnpressed} `
					}
				></button>
				{/* <div className='col-span-1'></div> */}
			</div>

			<h2 className='mt-12'>Result</h2>
			<div className='px-4 py-2 m-2 text-2xl bg-white text-black shadow-md rounded-md font-["Consolas"]'>
				0b
				{Object.keys(values)
					.map((key) => values[key])
					.reverse()
					.join('')}
			</div>
		</main>
	);
}
