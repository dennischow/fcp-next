import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import qs from "qs";
import { ThreeDots } from "react-loader-spinner";
import { FaTelegramPlane, FaExclamationTriangle, FaTimes, FaCheck } from "react-icons/fa";

import useUIStore from "../../../store/ui";
import api from "../../../services/api";
import AppInputField from "../../form/app-input-field/app-input-field";
import AppTextareaField from "../../form/app-textarea-field/app-textarea-field";
import AppSelectField from "../../form/app-select-field/app-select-field";

const AppPanelContact = () => {

    const { setIsPanelContactShow } = useUIStore();
    const [loaderFeedback, setLoaderFeedback] = useState({ indicator: false, message: "", result: null });

    const contactFormObj = useFormik({
        initialValues: {
            contact_name: "",
            email_address: "",
            subject: "",
            message: "",
            referral_by: "",
        },
        validationSchema: Yup.object().shape({
            contact_name: Yup.string().required("This field is required."),
            email_address: Yup.string().email("Invalid email address").required("This field is required."),
            subject: Yup.string().required("This field is required."),
            message: Yup.string().required("This field is required."),
            referral_by: Yup.string().required("This field is required."),
        }),
        onSubmit: async (values, formikBag) => {
            console.log("values: ", values);
            console.log("formikBag: ", formikBag);
            console.log(JSON.stringify(values, null, 2));

            setLoaderFeedback({
                indicator: true,
                message: "Sending out the message...",
                result: null,
            });

            try {
                const response = await api.post.contact(qs.stringify(values));
                setLoaderFeedback({
                    indicator: false,
                    message: response.data.status,
                    result: response.data.result ? "success" : "failed",
                });
                setTimeout(() => {
                    if (response.data.result) {
                        formikBag.resetForm();
                    }
                    formikBag.setSubmitting(false);
                }, 3000);
            } catch (error) {
                setLoaderFeedback({
                    indicator: false,
                    message: error.message,
                    result: "failed",
                });
                setTimeout(() => {
                    formikBag.setSubmitting(false);
                }, 3000);
            }
        },
    });

    const clearFormHandler = (formikBag) => {
        formikBag.resetForm();
        setIsPanelContactShow(false);
    };

    const subjectOptions = [
        {
            label: "-- Select a subject --",
            value: "",
        },
        {
            label: "General",
            value: "General",
        },
        {
            label: "Comment",
            value: "Comment",
        },
        {
            label: "Testimonial",
            value: "Testimonial",
        },
        {
            label: "Hang out",
            value: "Hang out",
        },
        {
            label: "Recommendation",
            value: "Recommendation",
        },
    ];

    const referralByOptions = [
        {
            label: "-- Select referral by --",
            value: "",
        },
        {
            label: "Search Engine",
            options: [
                {
                    label: "Google",
                    value: "Google",
                },
                {
                    label: "Yahoo",
                    value: "Yahoo",
                },
                {
                    label: "Bing",
                    value: "Bing",
                },
                {
                    label: "DuckDuckGo",
                    value: "DuckDuckGo",
                },
            ],
        },
        {
            label: "Social Networking",
            options: [
                {
                    label: "LinkedIn",
                    value: "LinkedIn",
                },
                {
                    label: "Facebook",
                    value: "Facebook",
                },
                {
                    label: "Twitter",
                    value: "Twitter",
                },
                {
                    label: "Instagram",
                    value: "Instagram",
                },
            ],
        },
        {
            label: "Others",
            options: [
                {
                    label: "Friend",
                    value: "Friend",
                },
                {
                    label: "Colleague",
                    value: "Colleague",
                },
                {
                    label: "Recruitment Agency",
                    value: "Recruitment Agency",
                },
                {
                    label: "Others",
                    value: "Others",
                },
            ],
        },
    ];

    return (
        <>
            <div className="app-panel-contact">

                {contactFormObj.isSubmitting && (
                    <div className="app-panel-contact__loader">
                        <div className="app-panel-contact__loader-inner">
                            {loaderFeedback.indicator && (
                                <div className="app-panel-contact__loader-indicator">
                                    <ThreeDots
                                        height="50"
                                        width="50"
                                        radius="10"
                                        color="#000000"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClassName
                                        visible={true}
                                    />
                                </div>
                            )}

                            {loaderFeedback.result && (
                                <p className={`app-panel-contact__loader-status app-panel-contact__loader-status--${loaderFeedback.result}`}>
                                    {loaderFeedback.result === "success" ? <FaCheck /> : <FaTimes />}
                                </p>
                            )}

                            <p className="app-panel-contact__loader-message">{loaderFeedback.message}</p>
                        </div>
                    </div>
                )}

                <form className="app-panel-contact__form" noValidate autoComplete="off" onSubmit={contactFormObj.handleSubmit}>
                    <fieldset className="app-panel-contact__fieldset">
                        <legend className="app-panel-contact__legend">Get in touch</legend>

                        <AppInputField
                            type="text"
                            name="contact_name"
                            placeholder="Contact name"
                            form={contactFormObj}
                            autoFocus
                        />

                        <AppInputField
                            type="email"
                            name="email_address"
                            placeholder="Email address"
                            form={contactFormObj}
                        />

                        <AppSelectField
                            name="subject"
                            options={subjectOptions}
                            form={contactFormObj}
                        />

                        <AppTextareaField
                            name="message"
                            placeholder="Your message"
                            rows={5}
                            maxLength={2000}
                            form={contactFormObj}
                        />

                        <AppSelectField
                            name="referral_by"
                            options={referralByOptions}
                            form={contactFormObj}
                        />

                        <div className="app-panel-contact__buttons-container">
                            <button
                                className="app-panel-contact__button app-panel-contact__button--submit"
                                type="submit"
                                disabled={contactFormObj.isSubmitting}>
                                Send <FaTelegramPlane />
                            </button>
                            <button
                                className="app-panel-contact__button app-panel-contact__button--reset"
                                type="button"
                                disabled={contactFormObj.isSubmitting}
                                onClick={() => clearFormHandler(contactFormObj)}>
                                Close <FaTimes />
                            </button>
                        </div>

                        <p className="app-panel-contact__note">
                            <FaExclamationTriangle /> Note: All fields are required. Please make sure you have inserted a correct email address,
                            otherwise, I cannot reach you.
                        </p>
                    </fieldset>
                </form>
            </div>
        </>
    );
};

export default AppPanelContact;
