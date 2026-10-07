import { useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { Auth } from "@entities/auth";
import { useAppDispatch, useAppSelector } from "@shared/hooks/store.hooks";
import "./AuthForm.scss";

export const AuthVerify = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const verify = useAppSelector((state) => state.auth.verify);

  useEffect(() => {
    if (token) dispatch(Auth.actions.verifyRequest({ token }));
  }, [dispatch, token]);

  if (verify === "success") {
    return <Navigate to="/" replace />;
  }

  if (!token || verify === "error") {
    return (
      <div className="auth-form auth-form--sended">
        <h1 className="auth-form__title">Не удалось войти</h1>
        <p className="auth-form__text" role="alert">
          Ссылка недействительна или устарела. Запросите новую.
        </p>
        <Link className="auth-form__link" to="/auth">
          Получить новую ссылку
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-form auth-form--sended">
      <div className="auth-form__badge" aria-hidden="true">
        <span className="auth-form__spinner" />
      </div>
      <h1 className="auth-form__title">Входим…</h1>
      <p className="auth-form__text" role="status">
        Проверяем ссылку, это займёт пару секунд.
      </p>
    </div>
  );
};
