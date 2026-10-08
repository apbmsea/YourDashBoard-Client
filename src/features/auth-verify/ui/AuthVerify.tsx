import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { ROUTES } from "@shared/config/routes";
import { useAppDispatch, useAppSelector } from "@shared/hooks/store.hooks";
import { Button } from "@shared/ui/Button";
import { FormCard } from "@shared/ui/FormCard";
import { Spinner } from "@shared/ui/Spinner";
import { actions } from "../model/authVerifySlice";

export const AuthVerify = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { verify, error } = useAppSelector((state) => state.authVerify);

  useEffect(() => {
    if (token) dispatch(actions.verifyRequest({ token }));
  }, [dispatch, token]);

  if (verify === "success") {
    return <Navigate to={ROUTES.home} replace />;
  }

  if (!token || verify === "error") {
    return (
      <FormCard
        title="Не удалось войти"
        text={error ?? "Ссылка недействительна или устарела. Запросите новую."}
        textRole="alert"
      >
        <Button variant="link" to={ROUTES.auth}>
          Получить новую ссылку
        </Button>
      </FormCard>
    );
  }

  return (
    <FormCard
      title="Входим…"
      text="Проверяем ссылку, это займёт пару секунд."
      textRole="status"
      badge={<Spinner />}
    />
  );
};
