import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_WEATHER_QUERY } from '../Graphql/queries';

const log = console.log.bind(document);

const Home = () => {
	const [citySearched, setCitySearched] = useState('');
	const [getWeather, { loading, error, data }] = useLazyQuery(
		GET_WEATHER_QUERY,
		{
			variables: { name: citySearched },
		}
	);

	useEffect(() => {
		if (error) return log('get all errors =>', error);
		if (loading) return <h4>Loading....</h4>;
		if (data) return log('get all data =>', data);
	}, [error, loading, data]);

	const handleChange = (e) => {
		const { value } = e.target;
		setCitySearched(value);
	};

	const displayWeather = () => {
		if (citySearched === '') {
			return (
				<div className='row'>
					<h4 className='weather-emp col-4 mt-5 border w-25 border-info rounded'>
						Name:
					</h4>
					<h5 className='weather-emp col-4 mt-5 border w-25 ms-5 border-info rounded'>
						Humidity:
					</h5>
					<h5 className='weather-emp col-4 mt-5 border w-25 ms-5 border-info rounded'>
						Description:
					</h5>
					<h5 className='weather-emp col-4 mt-4 border w-25 border-info rounded'>
						Actual Temperature:
					</h5>
					<h5 className='weather-emp col-4 mt-4 border w-25 ms-5 border-info rounded'>
						Max Temperature:
					</h5>
					<h5 className='weather-emp col-4 mt-4 border w-25 ms-5 border-info rounded'>
						Min Temperature:
					</h5>
					<h5 className='weather-emp col-4 mt-4 border w-25 border-info rounded'>
						Wind Speed:
					</h5>
					<h5 className='weather-emp col-4 mt-4 border ms-5 border-info rounded'>
						Wind Degrees:
					</h5>
				</div>
			);
		} else if (citySearched.length > 0 && data) {
			return (
				<div className='row mt-5'>
					{/* used "optional chaning to ensure that if the data is not available or if any variable is not available it shows "undefined" until data or variable is defined/available */}
					<h4 className='weather-emp col-4 mt-5 border w-25 border-info rounded'>
						Name: {data?.getCityByName?.name}
					</h4>
					<h5 className='weather-emp col-4 mt-5 border w-25 ms-5 border-info rounded'>
						Humidity:{' '}
						{data?.getCityByName?.weather?.clouds?.humidity}%
					</h5>
					<h5 className='weather-emp col-4 mt-5 border w-25 ms-5 border-info rounded'>
						Description:{' '}
						{data?.getCityByName?.weather?.summary?.description}
					</h5>
					<h5 className='weather-emp col-4 mt-4 border w-25 border-info rounded'>
						Actual Temperature:{' '}
						{data?.getCityByName?.weather?.temperature?.actual}
					</h5>
					<h5 className='weather-emp col-4 mt-4 border w-25 ms-5 border-info rounded'>
						Max Temperature:{' '}
						{data?.getCityByName?.weather?.temperature?.max}
					</h5>
					<h5 className='weather-emp col-4 mt-4 border w-25 ms-5 border-info rounded'>
						Min Temperature:{' '}
						{data?.getCityByName?.weather?.temperature?.min}
					</h5>
					<h5 className='weather-emp col-4 mt-4 border w-25 border-info rounded'>
						Wind Speed: {data?.getCityByName?.weather?.wind?.speed}mph
					</h5>
					<h5 className='weather-emp col-4 mt-4 border ms-5 border-info rounded'>
						Wind Degrees: {data?.getCityByName?.weather?.wind?.deg}
					</h5>
				</div>
			);
		}
	};

	return (
		<div className='home position-relative container mt-4'>
			<h2 className='text-center'>Search for weather information</h2>
			<div className='position-absolute top-0 start-50 translate-middle mt-5 row'>
				<div className='col-auto mt-5 mb-3'>
					<input
						type='text'
						placeholder='City name...'
						onChange={handleChange}
						value={citySearched}
						className='form-control'
					/>
				</div>
				<div className='col-auto mt-5'>
					<button
						type='button'
						onClick={() => getWeather()}
						className='btn btn-warning'>
						Search
					</button>
				</div>
			</div>
			<div className='container'>{displayWeather()}</div>
		</div>
	);
};

export default Home;
