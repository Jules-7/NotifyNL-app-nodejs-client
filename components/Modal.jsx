import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export default function Modal({isOpen, closeModal, templateId, templateType, templatePersonalisation}) {

    const [phoneNumber, setPhoneNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [personalisation, setPersonalisation] = useState({});

    const personalisationKeys = Object.keys(templatePersonalisation);

    const handlePersonalisationOnChange = (e) => {
        setPersonalisation({
            ...personalisation,
            [e.target.name]: e.target.value
        })
    }

    const send = () => {

        const recipient = templateType === "sms"? phoneNumber : emailAddress;

        const payload = {
            templateId: templateId,
            recipient: recipient,
            personalisation: personalisation,
            channel: templateType,
        };

        fetch("/api/send-message", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
    }



    return (
        <>
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                    >
                        Fill in fields required to send this {templateType}
                    </Dialog.Title>
                    {
                        templateType === "sms" &&
                        <div className="mt-2">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                Phone number
                            </label>
                            <input
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                name="phoneNumber"
                                key="phoneNumber"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    }

                    {
                        templateType === "email" &&
                        <div className="mt-2">
                            <label htmlFor="emailAddress" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <input
                                value={emailAddress}
                                onChange={(e) => setEmailAddress(e.target.value)}
                                name="emailAddress"
                                key="emailAddress"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    }
                    <div className="flex flex-col space-y-2 mt-2">
                        {personalisationKeys.map((key, index) => {
                            return(
                                <div key={index}>
                                    <label htmlFor={key} key={`label for ${key}`} className="block text-sm font-medium leading-6 text-gray-900 capitalize">
                                        {key}
                                    </label>
                                    <input
                                        value={personalisation[key] || ""}
                                        onChange={handlePersonalisationOnChange}
                                        name={key}
                                        key={key}
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            )
                        })}
                    </div>

                    <div className="mt-4">
                        <button
                            type="button"
                            key="button"
                            className="inline-flex justify-center mt-2 rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                            onClick={() => {
                                send();
                                closeModal();
                            }}
                        >
                            Send {templateType}
                        </button>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
        </>
  )
}
