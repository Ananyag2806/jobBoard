import React from 'react';
import { useState, useEffect } from 'react';
import './comp.css';
import Button from '@mui/material/Button';
import FileCopyOutlinedIcon from '@mui/icons-material/FileCopyOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Divider from '@mui/material/Divider';
import OutlinedInput from '@mui/material/OutlinedInput';
import DialpadOutlinedIcon from '@mui/icons-material/DialpadOutlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';

const useStyles = makeStyles((theme) => ({
	// root: {
	// 	background: '#92E3A9',
	// 	display: 'flex',
	// 	justifyContent: 'center',
	// 	width: '100%',
	// 	height: '100vh',
	// 	[theme.breakpoints.down('450')]: {
	// 		background: '#ffffff',
	// 	},
	// },
	box: {
		display: 'flex',
		// justifyContent: 'center',
		width: '100%',
	},
}));

function Candidate() {
	const classes = useStyles();
	const [tags, setTags] = useState(['skldjf', 'sldkfj']);

	function handleKeyDown(e) {
		console.log(e);
		if (e.key !== 'Enter') return;
		const value = e.target.value;
		if (!value.trim()) return;
		setTags([...tags, value]);
		console.log(value);
		e.target.value = '';
	}

	function removeTag(index) {
		setTags(tags.filter((el, i) => i !== index));
	}

	return (
		<div>
			<Button variant='contained' endIcon={<FileCopyOutlinedIcon />}>
				Upload Resume
			</Button>
			{/* <input
				type='file'
				id='file'
				className='input-file'
				accept='.docx'
				onChange={(e) => handleFileChosen(e.target.files[0])}
			/> */}

			<Box
				className={classes.box}
				sx={{
					'& > :not(style)': { m: 1, width: '105ch' },
				}}
				noValidate
				autoComplete='off'>
				<h6>Name</h6>
				<TextField id='outlined-basic' variant='outlined' />
			</Box>
			<Box
				className={classes.box}
				sx={{
					'& > :not(style)': { m: 1, width: '105ch' },
				}}
				noValidate
				autoComplete='off'>
				<h6>Work XP</h6>
				<TextField
					id='outlined-basic'
					variant='outlined'
					multiline
					rows={4}
				/>
			</Box>
			<Box
				className={classes.box}
				sx={{
					'& > :not(style)': { m: 1, width: '105ch' },
				}}
				noValidate
				autoComplete='off'>
				<h6>Tech Stack</h6>
				<div className='tags-input-container'>
					{tags.map((tag, index) => (
						<div className='tag-item' key={index}>
							<span className='text'>{tag}</span>
							<span
								className='close'
								onClick={() => removeTag(index)}>
								&times;
							</span>
						</div>
					))}
					<input
						onKeyDown={handleKeyDown}
						type='text'
						className='tags-input'
						placeholder='Type somthing'
					/>
				</div>
			</Box>
			<Box
				className={classes.box}
				sx={{
					'& > :not(style)': { m: 1, width: '105ch' },
				}}
				noValidate
				autoComplete='off'>
				<h6>Expected Salary</h6>
				<OutlinedInput
					id='outlined-adornment-amount'
					startAdornment={
						<PaidOutlinedIcon position='start'>$</PaidOutlinedIcon>
					}
				/>
			</Box>

			<Divider>contact details</Divider>

			<Box
				className={classes.box}
				sx={{
					'& > :not(style)': { m: 1, width: '105ch' },
				}}
				noValidate
				autoComplete='off'>
				<h6>Phone No.</h6>
				<OutlinedInput
					id='outlined-adornment-amount'
					startAdornment={
						<DialpadOutlinedIcon position='start'></DialpadOutlinedIcon>
					}
				/>
			</Box>
			<Box
				className={classes.box}
				sx={{
					'& > :not(style)': { m: 1, width: '105ch' },
				}}
				noValidate
				autoComplete='off'>
				<h6>Email</h6>
				<TextField id='outlined-basic' variant='outlined' />
			</Box>
			<Box
				className={classes.box}
				sx={{
					'& > :not(style)': { m: 1, width: '105ch' },
				}}
				noValidate
				autoComplete='off'>
				<h6>LinkedIN</h6>
				<TextField id='outlined-basic' variant='outlined' />
			</Box>
			<Box
				className={classes.box}
				sx={{
					'& > :not(style)': { m: 1, width: '105ch' },
				}}
				noValidate
				autoComplete='off'>
				<h6>Github</h6>
				<TextField id='outlined-basic' variant='outlined' />
			</Box>

			<Divider></Divider>

			<Button variant='contained' endIcon={<FileCopyOutlinedIcon />}>
				Submit
			</Button>
		</div>
	);
}

export default Candidate;
