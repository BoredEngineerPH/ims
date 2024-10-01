import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
// Components
import Dashboard from "@/components/Layouts/Dashboard";
import AccountSettingsForm from '@/form/AccountSettingsForm';

export const metadata: Metadata = {
    title: `Account Settings | ${process.env.APP_NAME}`,
  };

const Settings = () => {
    return (
        <Dashboard>
            <div className="mx-auto max-w-270">
                <Breadcrumb
                    current_page="Settings"
                    crumbs={[
                        {
                            label: 'Account',
                            path: '/account'
                        }
                    ]}
                />

                <AccountSettingsForm />
            </div>
        </Dashboard>
    );
};

export default Settings;
