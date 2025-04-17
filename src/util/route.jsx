export const LazyImport = (lazy) => {
	const Component = lazy ? lazy : () => null
	return <Component />
}
