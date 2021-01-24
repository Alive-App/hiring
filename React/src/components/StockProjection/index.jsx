import React from 'react';
import { useForm } from 'react-hook-form';
import store from '../../config/store';
import { isSameDay, isValid, parseISO } from 'date-fns';
import { Button } from 'primereact/button';

function StockProjection({ id }) {
  const { register, watch } = useForm();
  const values = watch();
  const { v = 0, startValue = 0, endValue = 0 } = React.useMemo(() => {
    const data = store.getState().history.daily[id];

    if (data && isValid(parseISO(values.start_date)) && isValid(parseISO(values.end_date))) {
      const { list = [] } = data;
      const start = list.find(([date]) => isSameDay(typeof date == 'string' ? parseISO(date) : date, parseISO(values.start_date)));
      const end = list.find(([date]) => isSameDay(typeof date == 'string' ? parseISO(date) : date, parseISO(values.end_date)));
      if (start && end) {
        const startValue = start[1] * values.qty;
        const endValue = end[1] * values.qty;

        return { startValue, endValue, v: endValue - startValue };
      }
    }
    return {};
  }, [values, id]);

  return (
    <div className="p-card p-p-2 p-mt-2">
      <h5>Projeção de ganhos</h5>
      <div className="p-grid">
        <div className="p-col p-col-2">
          <input className="p-inputtext" required defaultValue="1" placeholder="quantidade" ref={register} name="qty" />
        </div>
        <div className="p-col p-col-2">
          <input className="p-inputtext" required type="date" max={values.end_date} ref={register} name="start_date" />
          {!!startValue && <div className="p-col-12">Valor: {startValue.toFixed(2)}</div>}
        </div>
        <div className="p-col p-col-2">
          <input className="p-inputtext" required type="date" max={new Date()} min={values.start_date} ref={register} name="end_date" />
          {!!endValue && <div className="p-col-12">Valor: {endValue.toFixed(2)}</div>}
        </div>
        <div className="p-col p-col-1">
          <Button icon="pi pi-search" />
        </div>
        <div className="p-col p-col-3">
          {'Lucro: '}
          <span className={'p-text-bold '} style={{ fontSize: 20, color: v < 0 ? 'red' : 'green' }}>
            {v.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StockProjection;
