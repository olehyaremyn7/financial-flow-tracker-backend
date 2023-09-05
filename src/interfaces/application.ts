export enum Mode {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  TEST = 'test',
}

export enum NodeExitCode {
  Success = 0,
  UncaughtFatalException = 1,
  ReservedBash = 2,
  InternalJavaScriptParseError = 3,
  InternalJavaScriptEvaluationFailure = 4,
  FatalError = 5,
  NonFunctionInternalExceptionHandler = 6,
  InternalExceptionHandlerRuntimeFailure = 7,
  UncaughtError = 8,
  InvalidArgument = 9,
  InternalJavaScriptRuntimeFailure = 10,
  InvalidDebugArgument = 12,
  SignalExit = 128,
}
