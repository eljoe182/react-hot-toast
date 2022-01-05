import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import PropTypes from 'prop-types';

const Card = ({ title, onSetStyles, children }) => {
  return (
    <div className='card'>
      <div className='card-header'>{title}</div>
      <div className='card-body'>{children}</div>
      <div className='card-footer'>
        <button type='button' className='btn btn-primary' onClick={onSetStyles}>
          Test
        </button>
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  onSetStyles: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const positions = [
  {
    text: '--Selection a position--',
    value: '',
  },
  {
    text: 'Top left',
    value: 'top-left',
  },
  {
    text: 'Top center',
    value: 'top-center',
  },
  {
    text: 'Top right',
    value: 'top-right',
  },
  {
    text: 'Bottom left',
    value: 'bottom-left',
  },
  {
    text: 'Bottom center',
    value: 'bottom-center',
  },
  {
    text: 'Bottom right',
    value: 'bottom-right',
  },
];

const App = () => {
  const [styleOptions, setStyleOptions] = React.useState(null);
  const notifyDefault = () => toast('Here is your toast default.');
  const notifySuccess = () => toast.success('Here is your toast success.');
  const notifyError = () => toast.error('Here is your toast error.');
  const notifyStyled = () => toast('Here is your toast styled.', styleOptions);
  const notifyLoading = () => toast.loading('Here is your toast loading.');
  const notifyCustom = () => toast.custom(() => <ToastCustom />);

  const [backgroundStyled, setBackgroundStyled] = React.useState('#6c757d');
  const [colorStyled, setColorStyled] = React.useState('#ffffff');
  const [durationStyled, setDurationStyled] = React.useState(4000);
  const [positionSelected, setPositionSelected] = React.useState('top-right');

  const onSetStyles = ({
    background = backgroundStyled,
    color = colorStyled,
    duration = durationStyled,
    position = positionSelected,
  }) => {
    setStyleOptions({
      duration,
      position,
      style: {
        background,
        color,
      },
    });
  };

  React.useEffect(() => {
    if (styleOptions) notifyStyled();
  }, [styleOptions]);

  const ToastCustom = () => (
    <div
      className='toast show align-items-center'
      role='alert'
      aria-live='assertive'
      aria-atomic='true'
    >
      <div className='d-flex'>
        <div className='toast-body'>This is a custom toast.</div>
        <button
          type='button'
          className='btn-close me-2 m-auto'
          data-bs-dismiss='toast'
          aria-label='Close'
        ></button>
      </div>
    </div>
  );

  return (
    <div className='container'>
      <div className='row my-3'>
        <h1>React hot toast</h1>
      </div>
      <div className='row my-3'>
        <div className='col-4'>
          <h3>Default</h3>
          <div className='col'>
            <button type='button' className='btn btn-primary' onClick={notifyDefault}>
              Toast default
            </button>
          </div>
        </div>
        <div className='col-4'>
          <h3>Success</h3>
          <div className='col'>
            <button type='button' className='btn btn-primary' onClick={notifySuccess}>
              Toast success
            </button>
          </div>
        </div>
        <div className='col-4'>
          <h3>Error</h3>
          <div className='col'>
            <button type='button' className='btn btn-primary' onClick={notifyError}>
              Toast error
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className='row my-3'>
        <h3>Styled</h3>
        <div className='col'>
          <div className='row mb-3 justify-content-center'>
            <div className='col-6'>
              <Card
                title='Options and styles'
                onSetStyles={() =>
                  onSetStyles({
                    background: backgroundStyled,
                    color: colorStyled,
                    position: positionSelected,
                  })
                }
              >
                <div className='row'>
                  <div className='col-6'>
                    <div className='mb-3'>
                      <label className='form-label'>Background</label>
                      <input
                        type='color'
                        className='form-control form-control-color'
                        value={backgroundStyled}
                        onChange={(e) => setBackgroundStyled(e.target.value)}
                      />
                    </div>
                    <div className='mb-3'>
                      <label className='form-label'>Duration</label>
                      <input
                        type='number'
                        className='form-control'
                        value={durationStyled}
                        onChange={(e) => setDurationStyled(parseInt(e.target.value, 10))}
                      />
                    </div>
                  </div>
                  <div className='col-6'>
                    <div className='mb-3'>
                      <label className='form-label'>Color text</label>
                      <input
                        type='color'
                        className='form-control form-control-color'
                        value={colorStyled}
                        onChange={(e) => setColorStyled(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className='form-label'>Position</label>
                      <select
                        className='form-select'
                        onChange={(e) => setPositionSelected(e.target.value)}
                      >
                        {positions.map(({ text, value }, index) => (
                          <option key={index} value={value}>
                            {text}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className='row my-3'>
        <h3>Loading</h3>
        <div className='col'>
          <button type='button' className='btn btn-primary' onClick={notifyLoading}>
            Toast loading
          </button>
        </div>
      </div>
      <hr />
      <div className='row my-3 mb-5'>
        <h3>Custom</h3>
        <div className='col'>
          <button type='button' className='btn btn-primary' onClick={notifyCustom}>
            Toast custom
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default App;
