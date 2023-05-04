function withGreeting(WrappedComponent: any) {
  console.log('11', WrappedComponent)
  return function (props: any) {
    return <WrappedComponent greeting="Hi" {...props} />
  }
}

export default withGreeting
