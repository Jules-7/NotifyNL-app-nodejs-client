"use client";

import { useEffect, useState } from 'react';
import List from '@/components/List';

export default function Home() {
  const [smsList, setSmsList] = useState(null);
  const [emailList, setEmailList] = useState(null);

  useEffect(() => {
    const fetchSMSTemplates = async () => {
      const response = await fetch('/api/get-templates?channel=sms');
      const responseData = await response.json();
      setSmsList(responseData.templates);
    }
    const fetchEmailTemplates = async () => {
      const response = await fetch('/api/get-templates?channel=email');
      const responseData = await response.json();
      setEmailList(responseData.templates);
    }
    fetchSMSTemplates();
    fetchEmailTemplates();
  }, []);

  if (!smsList || !emailList) return <div>Loading...</div>;

  return (
    <div className="bg-gray-700">
      <main className="flex min-h-screen flex-col items-center justify-between p-24">

        <h2 className='text-3xl font-semibold pb-12'>NotifyNL Client</h2>

        <div className='flex flex-col space-y-8'>
          <div>
            <h3 className='text-2xl font-semibold mb-2'>SMS templates</h3>
            <List templates={smsList} templatesType="sms"/>
          </div>
          <div>
            <h3 className='text-2xl font-semibold mb-2'>Email templates</h3>
            <List templates={emailList} templatesType="email"/>
          </div>
        </div>

      </main>
    </div>
  )
}
