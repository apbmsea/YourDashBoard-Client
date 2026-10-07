import React, { useState } from "react";
import { Auth } from "@entities/auth";
import { useAppDispatch, useAppSelector } from "@shared/hooks/store.hooks";
import "./AuthForm.scss";

export const AuthForm = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const { isFetch, state } = useAppSelector((state) => state.auth);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) return;
    dispatch(Auth.actions.authRequest({ email }));
  };

  if (state === "sended") {
    return (
      <div className="auth-form auth-form--sended">
        <div className="auth-form__badge" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none">
            <path
              d="M4 7.5 12 13l8-5.5M5.5 5h13A1.5 1.5 0 0 1 20 6.5v11a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5v-11A1.5 1.5 0 0 1 5.5 5Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h1 className="auth-form__title">Проверьте почту</h1>
        <p className="auth-form__text" role="status">
          Ссылка для входа отправлена на{" "}
          <span className="auth-form__email">{email}</span>
        </p>
        <button
          type="button"
          className="auth-form__link"
          onClick={() => dispatch(Auth.actions.authReset())}
        >
          Изменить почту
        </button>
      </div>
    );
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1 className="auth-form__title">Вход</h1>
      <p className="auth-form__text">
        Укажите почту — пришлём ссылку для входа.
      </p>

      <div className="auth-form__field">
        <label className="auth-form__label" htmlFor="email">
          Email
        </label>
        <input
          className="auth-form__input"
          id="email"
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          required
          autoFocus
          value={email}
          disabled={isFetch}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <button
        className="auth-form__submit"
        type="submit"
        disabled={isFetch}
        aria-busy={isFetch}
      >
        {isFetch && <span className="auth-form__spinner" aria-hidden="true" />}
        {isFetch ? "Отправляем…" : "Получить ссылку"}
      </button>
    </form>
  );
};
