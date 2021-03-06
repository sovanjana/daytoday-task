import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';

export default function PhoneNoFieldComponent() {
	const { handleSubmit, errors, control, watch, setValue, clearErrors } = useForm({
		defaultValues: {
			countryCode: '+91',
			phoneNo: ''
		}
	});

	const countryCode = watch('countryCode');

	const onSubmit = (data: any) => console.log(data);

	return (
		<PhoneFieldForm onSubmit={handleSubmit(onSubmit)} className='field-form phone-field-form'>
			<Controller
				name='countryCode'
				control={control}
				render={({ onChange, ...rest }) => (
					<select
						onChange={e => {
							onChange(e.target.value);
							clearErrors('phoneNo');
							setValue('phoneNo', '');
						}}
						{...rest}
					>
						<option value='+1'>USA (+1)</option>
						<option value='+44'>UK (+44)</option>
						<option value='+91'>IND (+91)</option>
					</select>
				)}
			/>

			<Controller
				name='phoneNo'
				control={control}
				rules={{
					required: {
						value: true,
						message: 'Required'
					},
					pattern: {
						value:
							countryCode === '+91'
								? /^\d{9}$/
								: countryCode === '+1'
								? /^\d{8}$/
								: countryCode === '+44'
								? /^\d{8}$/
								: /^\d{9}$/,
						message: 'Enter a valid number'
					}
				}}
				render={({ onChange, ...rest }) => (
					<input
						onChange={e => {
							if (/^\d*$/.test(e.target.value)) onChange(e.target.value);
						}}
						{...rest}
					/>
				)}
			/>

			{errors?.phoneNo?.message ? <ErrorField text={errors?.phoneNo?.message} /> : null}
			<input type='submit' />
		</PhoneFieldForm>
	);
}

const ErrorField = styled(({ text }) => <span>{text}</span>)`
	position: absolute;
	bottom: -14px;
	font-size: 12px;
  color: #b40000;
  left: 100px;
`;
const PhoneFieldForm = styled.form`
	position: relative;
	width: 420px;
	height: 32px;
	margin: auto;
	display: grid;
	gap: 12px;
	grid-template-columns: 88px 1fr auto;
`;
