function withGreeting(WrappedComponent: any) {
  return function (props: any) {
    return <WrappedComponent greeting="Hi" {...props} />
  }
}

export default withGreeting
