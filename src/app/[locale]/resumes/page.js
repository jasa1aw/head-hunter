'use client'
import Header from '@/components/header';
import MyResumes from '@/components/myresumes';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyResumes } from '@/app/[locale]/store/slices/resumeSlice';
import Footer from '@/components/footer';
import Search from '@/components/header/search';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

export default function ResumePage() {
  const t = useTranslations('Header')
  const dispatch = useDispatch();
  const resumes = useSelector((state) => state.resume.resumes);
  
  const [file, setFile] = useState(null);

  const didMount = () => {
    dispatch(getMyResumes())
  }

  useEffect(didMount, [])

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a valid PDF file.');
    }
  }

  const sendResumeToApi = async () => {
    if (!file) {
      alert('Please select a PDF file first.');
      return;
    }

    const formData = new FormData();
    formData.append('filepath', file);

    try {
      const response = await fetch('http://localhost:8000/api/resumes/sendPdfResume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to send resume');
      }

      const data = await response.json();
      alert('Resume sent successfully!');
      console.log(data);
    } catch (error) {
      console.error('Error sending resume:', error);
      alert('Failed to send resume.');
    }
  }

  return (
    <div className='wrapper'>
      <Header />
      <main>
        <div className='container'>
          <Search />
          <div className='flex flex-ai-c flex-jc-sb ptb7'>
            <h1>{t("resumes")}</h1>
            <div className="flex">
              <Link href={'/create-resume'} className='button button-secondary-bordered'>{t('createResume')}</Link>
              <div className="file-upload-container">
                {/* Hidden file input */}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="file-input"
                />
                {/* Custom button that triggers the file input */}
                <button
                  className="file-upload-button"
                  onClick={() => document.querySelector('.file-input').click()}
                >
                  {file ? `File: ${file.name}` : t('chooseFile')}
                </button>
              </div>
              <button
                className="button button-primary"
                onClick={sendResumeToApi}
              >
                {t('sendResume')}
              </button>
            </div>
          </div>
          <MyResumes resumes={resumes} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
