"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button, Toast } from "react-bootstrap";
import { Formik } from "formik";
import { redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import schemaLogin from "./shema";
import { getDb, onLogin } from "../../../../firebase/firebase";
import Footer from "../Footer/Footer";

import "./Login.css";

const Login = () => {
  const [error, setError] = useState(false);
  const [user, loading] = useAuthState(getDb().auth);

  if (loading) {
    return (
      <div className="d-flex mt-5 align-items-center justify-content-center">
        <FontAwesomeIcon icon={faSpinner} size="3x" color="#dc3545" spin />
      </div>
    );
  }

  if (user) {
    return redirect("/home");
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="d-flex justify-content-center align-items-center m-4">
            {/* <Image
              src="/images/scanner.png"
              width={200}
              height={150}
              alt="scan logo"
              priority
            /> */}
          </div>
          <Formik
            validationSchema={schemaLogin}
            initialValues={{ email: "", password: "" }}
            onSubmit={async ({ email, password }) => {
              const res: any = await onLogin(email, password);
              if (res) {
                redirect("/home");
              } else setError(true);
            }}
          >
            {({ values, errors, touched, handleChange, handleSubmit }) => (
              <div className="login col-lg-6 col-xl-4 ">
                <Toast show={error} onClose={() => setError(false)}>
                  <Toast.Header>
                    <strong className="me-auto error">Erreur</strong>
                  </Toast.Header>
                  <Toast.Body className="error">
                    Login ou mot de passe incorrect
                  </Toast.Body>
                </Toast>
                <div className="form">
                  <form noValidate onSubmit={handleSubmit}>
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                      className="form-control form-control-lg"
                      placeholder="Votre email"
                    />
                    <p className="error">
                      {errors.email && touched.email && errors.email}
                    </p>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Votre mot de passe"
                      name="password"
                      onChange={handleChange}
                      value={values.password}
                    />
                    <p className="error">
                      {errors.password && touched.password && errors.password}
                    </p>

                    <div className="text-center text-lg-start mt-4 pt-2">
                      <Button type="submit" variant="danger">
                        Se connecter
                      </Button>
                      <p className="small fw-bold mt-2 pt-1 mb-0">
                        Vous n'avez pas de compte ?
                        <Link href="/register" className="link-danger px-1">
                          Enregistrer
                        </Link>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
