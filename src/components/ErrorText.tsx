const ErrorText = ({ err }: { err?: string }) => {
  if (!err || err === '') {
    return null;
  }
  return (
    <span className="text-xs text-red-500">
      {err}
    </span>
  )
}

export default ErrorText;