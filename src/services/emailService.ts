export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  business: string;
  location: string;
  service?: string;
  budget?: string;
  phone?: string;
  message?: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<boolean> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send email');
    }

    return true;
  } catch (error) {
    console.error('Contact API Error:', error);
    
    // Fallback to mailto if API fails
    console.warn('API failed, falling back to mailto');
    const subject = encodeURIComponent(`New Docs Sprint Lead from NextReach Studio`);
    const body = encodeURIComponent(
      `Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Product: ${formData.business}
Location: ${formData.location}
${formData.service ? `Service: ${formData.service}` : ''}
${formData.budget ? `Budget: ${formData.budget}` : ''}
${formData.phone ? `WhatsApp/Phone: ${formData.phone}` : ''}

Message: ${formData.message || 'No message provided'}`
    );
    window.location.href = `mailto:admin@nextreachstudio.com?subject=${subject}&body=${body}`;
    
    return false;
  }
};

// Alternative implementation using Formspree (free form service)
export const sendContactEmailViaFormspree = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // You can replace this with your actual Formspree form ID
    const response = await fetch('https://formspree.io/f/your_form_id', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        _replyto: formData.email,
        _subject: 'New Docs Sprint Lead from NextReach Studio',
        _to: 'admin@nextreachstudio.com'
      }),
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Error sending email via Formspree:', error);
    return false;
  }
};

// Alternative implementation using a simple API endpoint
export const sendContactEmailViaAPI = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // You can replace this with your actual API endpoint
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        to: 'admin@nextreachstudio.com',
        subject: 'New Docs Sprint Lead from NextReach Studio'
      }),
    });

    if (response.ok) {
      return true;
    } else {
      throw new Error('API submission failed');
    }
  } catch (error) {
    console.error('Error sending email via API:', error);
    return false;
  }
};
