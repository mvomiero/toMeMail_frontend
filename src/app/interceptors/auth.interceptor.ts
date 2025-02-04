import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = (typeof window !== 'undefined' && sessionStorage.getItem('jwt')) || null;

  if (req.url.includes('/auth/')) {
    return next(req);
  }

  const clonedRequest = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(clonedRequest);
};

