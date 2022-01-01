import Home from './Pages/Home';
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	// HttpLink,// not needed since we are dealing with public API//
} from '@apollo/client';

function App() {

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		// uri points to the public API url we would be fetching our data from//
		uri: 'https://graphql-weather-api.herokuapp.com/',
	});

	return (
		<ApolloProvider client={client}>
			<div>
				<Home />
			</div>
		</ApolloProvider>
	);
}

export default App;
