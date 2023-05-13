'use client';

import { useState, useMemo } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';

export default function Home() {
	const [showSource, setShowSource] = useState(false);
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

	const binaryValue = useMemo(() => {
		return (
			'0b' +
			Object.keys(values)
				.map((key) => values[key])
				.reverse()
				.join('')
		);
	}, [values]);

	const hexValue = useMemo(() => {
		return (
			'0x' +
			parseInt(
				Object.keys(values)
					.map((key) => values[key])
					.reverse()
					.join(''),
				2
			)
				.toString(16)
				.padStart(2, '0')
				.toUpperCase()
		);
	}, [values]);

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
		transition-colors duration-75
	`;

	const classBtnPressed =
		'border-solid border-4 border-red-500 bg-red-400 hover:bg-red-500 hover:border-red-600 ';

	const classBtnUnpressed =
		'border-solid border-4 border-zinc-300 bg-zinc-100 hover:bg-zinc-300 hover:border-zinc-400 ';

	const classBtnHor = `
		w-40 h-16 mx-auto 
	`;

	const classBtnVer = `
		h-28 w-16
	`;

	const classTitle = `
		text-2xl font-bold
	`;

	return (
		<main className='flex min-h-screen flex-col items-center justify-start p-6 '>
			<button
				onClick={() => {
					setShowSource(!showSource);
				}}
				className='
					px-4 py-2 mb-6 text-2xl bg-zinc-800 text-white shadow-md rounded-md font-["Consolas"]
				'
			>
				{showSource ? 'Hide' : 'Show'} Source
			</button>

			<div
				className='
					grid grid-cols-3 
					max-w-[20rem] place-items-center 
					p-2 py-6 w-full rounded-lg 
					border-solid border-2 border-zinc-400 
					shadow-lg bg-zinc-200
				'
			>
				{/* Button Zero */}
				<button
					onClick={handlePress}
					value={'0'}
					className={
						classButton +
						classBtnHor +
						' col-span-3 ' +
						` ${values['0'] === '1' ? classBtnPressed : classBtnUnpressed} `
					}
				>
					{showSource ? '0' : ''}
				</button>

				{/* Button Five */}
				<button
					onClick={handlePress}
					value={'5'}
					className={
						classButton +
						classBtnVer +
						' col-span-1 ' +
						` ${values['5'] === '1' ? classBtnPressed : classBtnUnpressed} `
					}
				>
					{showSource ? '5' : ''}
				</button>

				{/* Button One */}
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
				>
					{showSource ? '1' : ''}
				</button>

				{/* Button Six */}
				<button
					onClick={handlePress}
					value={'6'}
					className={
						classButton +
						classBtnHor +
						' col-span-3 ' +
						` ${values['6'] === '1' ? classBtnPressed : classBtnUnpressed} `
					}
				>
					{showSource ? '6' : ''}
				</button>

				{/* Button Four */}
				<button
					onClick={handlePress}
					value={'4'}
					className={
						classButton +
						classBtnVer +
						' col-span-1 ' +
						` ${values['4'] === '1' ? classBtnPressed : classBtnUnpressed} `
					}
				>
					{showSource ? '4' : ''}
				</button>

				{/* Button Two */}
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
				>
					{showSource ? '2' : ''}
				</button>

				{/* Button Three */}
				<button
					onClick={handlePress}
					value={'3'}
					className={
						classButton +
						classBtnHor +
						' col-span-3 ' +
						` ${values['3'] === '1' ? classBtnPressed : classBtnUnpressed} `
					}
				>
					{showSource ? '3' : ''}
				</button>
			</div>

			<h2 className={classTitle + ' mt-6  '}>Results</h2>
			<section className='flex justify-center items-center'>
				<div
					onClick={() => {
						navigator.clipboard.writeText(binaryValue);
					}}
					className=' cursor-pointer hover:bg-zinc-200 transition-colors px-4 py-2 m-2 text-2xl bg-white text-black shadow-md rounded-md font-["Consolas"]'
				>
					<AiOutlineCopy className='inline' /> {binaryValue}
				</div>
				<div
					onClick={() => {
						navigator.clipboard.writeText(hexValue);
					}}
					className=' cursor-pointer hover:bg-zinc-200 transition-colors px-4 py-2 m-2 text-2xl bg-white text-black shadow-md rounded-md font-["Consolas"]'
				>
					<AiOutlineCopy className='inline' /> {hexValue}
				</div>
			</section>

			<h2 className={classTitle + ' mt-6 '}>History</h2>

			<div className='px-4 py-2 m-2 mb-12 text-2xl bg-white text-black shadow-md rounded-md font-["Consolas"] tracking-widest'>
				{value.split().join(' ')}
			</div>
		</main>
	);
}
