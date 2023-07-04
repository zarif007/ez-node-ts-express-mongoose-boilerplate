'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const handleZodError = err => {
  const errors = err.issues.map(issue => {
    return {
      path:
        issue === null || issue === void 0
          ? void 0
          : issue.path[
              (issue === null || issue === void 0
                ? void 0
                : issue.path.length) - 1
            ],
      message: issue === null || issue === void 0 ? void 0 : issue.message,
    };
  });
  return {
    statusCode: 400,
    message: 'Validation error',
    errorMessages: errors,
  };
};
exports.default = handleZodError;
