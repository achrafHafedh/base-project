"use client";
import { Button } from "react-bootstrap";
import { Formik } from "formik";
import { useState } from "react";
import { redirect } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import schemaRegister from "./shema";
import Link from "next/link";
import { getDb, onRegister } from "../../../../firebase/firebase";
import Footer from "../Footer/Footer";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";

const Register = () => {
  const [user, loading] = useAuthState(getDb().auth);
  const [registered, setRegistered] = useState(false);

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
    <div className="container-fluid">
      <div className="row d-flex justify-content-center align-items-center">
        {registered && (
          <div className="row d-flex justify-content-center align-items-center">
            <>
              Bienvenue chez Doken <br /> Vous allez recevoir un email avec
              votre mot de passe dans 24h.
            </>
          </div>
        )}
        {!registered && (
          <div className="col-lg-6 col-xl-4">
            <Formik
              validationSchema={schemaRegister}
              initialValues={{
                email: "",
                firstName: "",
                lastName: "",
                organisation: "",
                phone: "",
              }}
              onSubmit={async ({
                email,
                firstName,
                lastName,
                organisation,
                phone,
              }) => {
                const res = await onRegister(
                  email,
                  firstName,
                  lastName,
                  organisation,
                  phone
                );
                if (res) setRegistered(true);
              }}
            >
              {({ values, errors, touched, handleChange, handleSubmit }) => (
                <div className="register">
                  <div className="form">
                    <form noValidate onSubmit={handleSubmit}>
                      <input
                        type="text"
                        className="form-control form-control-lg my-2"
                        placeholder="Votre prénom"
                        name="firstName"
                        onChange={handleChange}
                        value={values.firstName}
                      />
                      <p className="error m-1">
                        {errors.firstName &&
                          touched.firstName &&
                          errors.firstName}
                      </p>
                      <input
                        type="text"
                        className="form-control form-control-lg my-2"
                        placeholder="Votre nom"
                        name="lastName"
                        onChange={handleChange}
                        value={values.lastName}
                      />
                      <p className="error m-1">
                        {errors.lastName && touched.lastName && errors.lastName}
                      </p>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={values.email}
                        className="form-control form-control-lg my-2"
                        placeholder="Votre email"
                      />
                      <p className="error m-1">
                        {errors.email && touched.email && errors.email}
                      </p>
                      <input
                        type="text"
                        className="form-control form-control-lg my-2"
                        placeholder="Votre organisation"
                        name="organisation"
                        onChange={handleChange}
                        value={values.organisation}
                      />
                      <p className="error m-1">
                        {errors.organisation &&
                          touched.organisation &&
                          errors.organisation}
                      </p>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter télèphone"
                        name="phone"
                        onChange={handleChange}
                        value={values.phone}
                      />
                      <p className="error m-1">
                        {errors.phone && touched.phone && errors.phone}
                      </p>

                      <div className="text-center text-lg-start pt-2">
                        <Button type="submit" variant="danger">
                          Enregistrer
                        </Button>
                        <p className="small fw-bold mt-2 pt-1 mb-0">
                          Vous avez un compte ?
                          <Link href="/" className="link-danger px-1">
                            Se connecter
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </Formik>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Register;
