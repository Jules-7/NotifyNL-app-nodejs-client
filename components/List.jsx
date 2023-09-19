import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import Modal from './Modal';

export default function List({templates, templatesType}) {

  const [isOpen, setIsOpen] = useState(false);
  const [templateId, setTemplateId] = useState(null);
  const [templatePersonalisation, setTemplatePersonalisation] = useState(null);

  function closeModal() {
      setIsOpen(false)
  }

  function openModal() {
      setIsOpen(true)
  }
  return (
    <>
    {isOpen && <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          templateId={templateId}
          templateType={templatesType}
          templatePersonalisation={templatePersonalisation}
        />
    }
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <li key={template.id} className="col-span-1 divide-y rounded-lg bg-white shadow">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between space-x-6">
                <div className="flex-1 space-y-1">
                  <span className="inline-flex flex-shrink-0 items-center rounded-full bg-blue-100 px-1.5 py-0.5 mb-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-green-600/20">
                      {template.name}
                  </span>
                  {template.subject && <h3 className="text-sm font-medium text-gray-900">Subject: {template.subject}</h3>}
                </div>
                <button
                  className="flex flex-row text-black border rounded-md px-2 py-1 items-center border-gray-300 bg-gray-100 hover:bg-gray-200"
                  onClick={() => {
                    setTemplateId(template.id);
                    setTemplatePersonalisation(template.personalisation);
                    openModal();
                  }}>
                  <FiSend className="h-4 w-4 text-black mr-1"/>Send
                </button>

              </div>

              <p className="mt-1 text-sm text-gray-500">Body: {template.body}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
    </>
  )
}
