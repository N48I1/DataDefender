import React, { useState } from 'react';
import { Save } from 'lucide-react';

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'dark-purple',
    refreshRate: '10',
    emailNotifications: true,
    pushNotifications: true,
    autoLogout: '30',
    language: 'en',
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
    setSaved(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would save to an API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-purple-900">Settings</h2>
            <button
              type="submit"
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>

          {saved && (
            <div className="mb-6 bg-green-50 text-green-700 p-3 rounded-md">
              Settings saved successfully!
            </div>
          )}
          
          <div className="space-y-6">
            <div className="border-b border-purple-100 pb-6">
              <h3 className="text-lg font-medium text-purple-900 mb-4">Appearance</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-700">Dashboard Theme</label>
                  <select
                    name="theme"
                    value={settings.theme}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                  >
                    <option value="dark-purple">Dark Purple</option>
                    <option value="light-purple">Light Purple</option>
                    <option value="system">System Default</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-700">Language</label>
                  <select
                    name="language"
                    value={settings.language}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="border-b border-purple-100 pb-6">
              <h3 className="text-lg font-medium text-purple-900 mb-4">Data Updates</h3>
              <div>
                <label className="block text-sm font-medium text-purple-700">Dashboard Refresh Rate</label>
                <select
                  name="refreshRate"
                  value={settings.refreshRate}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                >
                  <option value="5">5 seconds</option>
                  <option value="10">10 seconds</option>
                  <option value="30">30 seconds</option>
                  <option value="60">1 minute</option>
                </select>
              </div>
            </div>

            <div className="border-b border-purple-100 pb-6">
              <h3 className="text-lg font-medium text-purple-900 mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-purple-700">
                    Email Notifications
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="pushNotifications"
                    checked={settings.pushNotifications}
                    onChange={handleChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-purple-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-purple-700">
                    Push Notifications
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-purple-900 mb-4">Security</h3>
              <div>
                <label className="block text-sm font-medium text-purple-700">Auto Logout Timer</label>
                <select
                  name="autoLogout"
                  value={settings.autoLogout}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                >
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="never">Never</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;