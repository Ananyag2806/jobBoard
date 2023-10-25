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

function Company() {
	const classes = useStyles();
	const [tagsContacts, setTagsContacts] = useState(['skldjf', 'sldkfj']);
	const [tagsPri, setTagsPri] = useState(['skldjf', 'sldkfj']);
	const [tagsSec, setTagsSec] = useState(['skldjf', 'sldkfj']);

	function handleKeyDownContacts(e) {
		if (e.key !== 'Enter') return;
		const value = e.target.value;
		if (!value.trim()) return;
		setTagsContacts([...tagsContacts, value]);
		console.log(value);
		e.target.value = '';
	}

	function removeTagContacts(index) {
		setTagsContacts(tagsContacts.filter((el, i) => i !== index));
	}

	function handleKeyDownPri(e) {
		if (e.key !== 'Enter') return;
		const value = e.target.value;
		if (!value.trim()) return;
		setTagsPri([...tagsPri, value]);
		console.log(value);
		e.target.value = '';
	}

	function removeTagPri(index) {
		setTagsPri(tagsPri.filter((el, i) => i !== index));
	}
	function handleKeyDownSec(e) {
		if (e.key !== 'Enter') return;
		const value = e.target.value;
		if (!value.trim()) return;
		setTagsSec([...tagsSec, value]);
		console.log(value);
		e.target.value = '';
	}
	function removeTagSec(index) {
		setTagsSec(tagsSec.filter((el, i) => i !== index));
	}

	return (
		<div>
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

			<Button variant='contained' endIcon={<FileCopyOutlinedIcon />}>
				Upload Logo
			</Button>

			<Box
				className={classes.box}
				sx={{
					'& > :not(style)': { m: 1, width: '105ch' },
				}}
				noValidate
				autoComplete='off'>
				<h6>Website</h6>
				<TextField id='outlined-basic' variant='outlined' />
			</Box>
			<Box
				className={classes.box}
				sx={{
					'& > :not(style)': { m: 1, width: '105ch' },
				}}
				noValidate
				autoComplete='off'>
				<h6>Contacts</h6>
				<div className='tags-input-container'>
					{tagsContacts.map((tag, index) => (
						<div className='tag-item' key={index}>
							<span className='text'>{tag}</span>
							<span
								className='close'
								onClick={() => removeTagContacts(index)}>
								&times;
							</span>
						</div>
					))}
					<input
						onKeyDown={handleKeyDownContacts}
						type='text'
						className='tags-input'
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
				<h6>Requirements</h6>
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
				<h6>Primary Skills</h6>
				<div className='tags-input-container'>
					{tagsPri.map((tag, index) => (
						<div className='tag-item' key={index}>
							<span className='text'>{tag}</span>
							<span
								className='close'
								onClick={() => removeTagPri(index)}>
								&times;
							</span>
						</div>
					))}
					<input
						onKeyDown={handleKeyDownPri}
						type='text'
						className='tags-input'
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
				<h6>Secondary Skills</h6>
				<div className='tags-input-container'>
					{tagsSec.map((tag, index) => (
						<div className='tag-item' key={index}>
							<span className='text'>{tag}</span>
							<span
								className='close'
								onClick={() => removeTagSec(index)}>
								&times;
							</span>
						</div>
					))}
					<input
						onKeyDown={handleKeyDownSec}
						type='text'
						className='tags-input'
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
				<h6>Years of Experience</h6>
				<OutlinedInput
					id='outlined-adornment-amount'
					startAdornment={
						<PaidOutlinedIcon position='start'>$</PaidOutlinedIcon>
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
				<h6>Salary</h6>
				<OutlinedInput
					id='outlined-adornment-amount'
					startAdornment={
						<PaidOutlinedIcon position='start'>$</PaidOutlinedIcon>
					}
				/>
			</Box>
			<Divider></Divider>

			<Button variant='contained' endIcon={<FileCopyOutlinedIcon />}>
				Submit
			</Button>
		</div>
	);
}

export default Company;
