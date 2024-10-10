import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';  // Ensure useEffect is imported correctly
import styles from '../styles/companySetup.module.css';

const CompanySetup = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [companyName, setCompanyName] = useState('');
    const [address, setAddress] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [defaultClassification, setDefaultClassification] = useState('3MTR');
    const [logo, setLogo] = useState(null);
    const [logoUrl, setLogoUrl] = useState('');

    // Correct the useEffect to handle loading state properly
    useEffect(() => {
        if (status === 'loading') return;  // If session is still loading, don't proceed

        // If no session or user is not admin, redirect to login page
        if (!session || session.user.role !== 'admin') {
            router.push('/login');
        }
    }, [session, status, router]);

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) { // Validate file type and size (5MB limit)
            setLogo(file);
        } else {
            alert('Please upload a valid image file (PNG, JPEG) with size up to 5MB.');
        }
    };

    const uploadLogo = async () => {
        if (!logo) return;

        const formData = new FormData();
        formData.append('logo', logo);

        try {
            const res = await fetch('/api/upload-logo', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            setLogoUrl(data.logoUrl);  // Store the logo URL
        } catch (error) {
            console.error('Error uploading logo:', error);
        }
    };

    const handleSaveSettings = async () => {
        await uploadLogo();  // Ensure the logo is uploaded first

        const settings = {
            companyName,
            address,
            contactEmail,
            defaultClassification,
            logoUrl,
        };

        try {
            const res = await fetch('/api/company-settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(settings),
            });
            const data = await res.json();
            alert(data.message);
        } catch (error) {
            console.error('Error saving company settings:', error);
        }
    };

    if (status === 'loading') {
        return <p>Loading...</p>;  // Display loading message while session is being fetched
    }

    return (
        <div className={styles.container}>
            <h1>Company Setup</h1>

            <div className={styles.formContainer}>
                {/* Company Logo */}
                <div className={styles.formGroup}>
                    <label>Company Logo:</label>
                    <input type="file" accept="image/*" onChange={handleLogoChange} />
                    {logo && <img src={URL.createObjectURL(logo)} alt="Company Logo" className={styles.previewImage} />}
                </div>

                {/* Company Name */}
                <div className={styles.formGroup}>
                    <label>Company Name:</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
                </div>

                {/* Company Address */}
                <div className={styles.formGroup}>
                    <label>Address:</label>
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>

                {/* Contact Email */}
                <div className={styles.formGroup}>
                    <label>Contact Email:</label>
                    <input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                </div>

                {/* Default Task Classification */}
                <div className={styles.formGroup}>
                    <label>Default Task Classification:</label>
                    <select value={defaultClassification} onChange={(e) => setDefaultClassification(e.target.value)}>
                        <option value="3MTR">3 Months Maintenance (3MTR)</option>
                        <option value="IAS">Instant Action Sheet (IAS)</option>
                        <option value="Supplier Maintenance">Supplier Maintenance</option>
                        <option value="Critical (Leaks)">Critical (Leaks)</option>
                    </select>
                </div>

                {/* Save Button */}
                <button className={styles.saveButton} onClick={handleSaveSettings}>Save Settings</button>
            </div>
        </div>
    );
};

export default CompanySetup;
