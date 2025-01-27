import React, { useState } from 'react';
import { CheckIcon } from './ReactIcons/CheckIcon.tsx';
import { pageProgressMessage } from '../stores/page.ts';
import { httpPost } from '../lib/http.ts';

type InputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  required?: boolean;
  rows?: number;
};

function Input(props: InputProps) {
  const { label, name, type, value, onChange, required, rows } = props;
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          placeholder={label}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          autoComplete="off"
          data-1p-ignore=""
          data-form-type="other"
          data-lpignore="true"
        ></textarea>
      ) : (
        <input
          type={type}
          id={name}
          placeholder={label}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          autoComplete="off"
          data-1p-ignore=""
          data-form-type="other"
          data-lpignore="true"
        />
      )}
    </div>
  );
}

export function AdvertiseForm() {
  const [status, setStatus] = useState<'submitting' | 'submitted'>();
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    updates: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type, checked } = e.target as any;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    pageProgressMessage.set('Please wait');

    const { response, error } = await httpPost(
      `${import.meta.env.PUBLIC_API_URL}/v1-advertise`,
      formData,
    );
    if (!response || error) {
      pageProgressMessage.set('');
      setError(error?.message || 'Something went wrong. Please try again.');
      return;
    }

    setStatus('submitted');
    pageProgressMessage.set('');
  }

  if (status === 'submitted') {
    return (
      <div className="flex flex-col items-center justify-center rounded-md border bg-gray-50 p-12 text-center">
        <CheckIcon additionalClasses="h-12 w-12 text-green-500 mb-5" />
        <h2 className="text-balance text-xl font-semibold text-gray-900">
          Thank you for your interest in advertising with roadmap.sh
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          We will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-5 text-balance text-2xl font-bold">
        Ready to learn more? Fill out the form below to get started!
      </h2>
      {error && (
        <div className="relative mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
          {error}
        </div>
      )}
      <form className="mb-5" onSubmit={handleSubmit}>
        <div className="grid gap-0 sm:grid-cols-2 sm:gap-4">
          <Input
            label="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid gap-0 sm:grid-cols-2 sm:gap-4">
          <Input
            label="Title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            required
          />

          <Input
            label="Company"
            name="company"
            type="text"
            value={formData.company}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="grid gap-0 sm:grid-cols-2 sm:gap-4">
          <Input
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <Input
            label="Phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
          />
        </div>

        <Input
          label="Message (Optional)"
          name="message"
          type="textarea"
          value={formData.message}
          onChange={handleInputChange}
          rows={4}
        />
        <div className="mb-4 flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="updates"
              name="updates"
              type="checkbox"
              checked={formData.updates}
              onChange={handleInputChange}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="updates" className="font-medium text-gray-700">
              I want to receive occasional updates about new products or
              advertising opportunities with roadmap.sh
            </label>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Send
          </button>
        </div>
      </form>
    </>
  );
}
