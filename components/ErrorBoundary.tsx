import { Component, ErrorInfo, ReactNode } from 'react';
import Image from 'next/image';
import image from '../public/assets/images/error-icon.png';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div id="error-page">
          <div className="error-content">
            <div className="p-3" style={{ fontSize: '40px' }}>
              <Image src={image} width={250} height={250} alt="Error Image" />
            </div>
            <h4 data-text="Oops, Something Went Wrong!">Oops, Something Went Wrong!</h4>
            <p>
              Sorry, Our engineers are currently fixing something.
              <br />
              We expect them to be done soon.
            </p>
            <div className="error-btns">
              <a href="/">Refresh Page</a>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
