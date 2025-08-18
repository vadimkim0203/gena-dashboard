import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChartType } from '@/lib/mockData';
import { ChartData, NewChartDialogProps } from '@/lib/type';
import chartTypeAnalyzer from '@/lib/chartTypeAnalyzer';
import ChartPreview from './ChartPreview';

export function NewChartDialog({
  open,
  onOpenChange,
  onSubmit,
}: NewChartDialogProps) {
  const [title, setTitle] = useState('');
  const [rawDataInput, setRawDataInput] = useState('');
  const [parsedData, setParsedData] = useState<ChartData[]>([]);
  const [selectedType, setSelectedType] = useState<ChartType>('bar');
  const [step, setStep] = useState<'input' | 'preview'>('input');
  const [error, setError] = useState('');

  const handleDataInput = () => {
    try {
      const data = JSON.parse(rawDataInput);

      const dataArray = Array.isArray(data) ? data : [data];

      const suggestedType = chartTypeAnalyzer(dataArray);

      setParsedData(dataArray);
      setSelectedType(suggestedType);
      setStep('preview');
      setError('');
    } catch {
      setError('Invalid JSON data');
    }
  };

  const handleSubmit = () => {
    onSubmit({
      title,
      type: selectedType,
      rawData: parsedData,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {step === 'input' ? 'Add New Chart' : 'Preview Chart'}
          </DialogTitle>
        </DialogHeader>

        {step === 'input' ? (
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Chart Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Enter chart title"
              />
            </div>

            <div>
              <label htmlFor="data" className="block text-sm font-medium mb-1">
                Chart Data (JSON format)
              </label>
              <textarea
                id="data"
                value={rawDataInput}
                onChange={(e) => setRawDataInput(e.target.value)}
                className="w-full p-2 border rounded-md h-40 font-mono text-sm"
                placeholder='[{"month": "Jan", "value": 100}, {"month": "Feb", "value": 200}]'
              />
              {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleDataInput}
                disabled={!title || !rawDataInput}
              >
                Next
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Suggested Chart Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ChartType)}
                className="w-full p-2 border rounded-md"
              >
                <option value="bar">Bar Chart</option>
                <option value="pie">Pie Chart</option>
                <option value="area">Area Chart</option>
                <option value="value">Value Display</option>
                <option value="stacked">Stacked Chart</option>
              </select>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="text-sm font-medium mb-2">Chart Preview</h3>
              <div className="h-[300px]">
                <ChartPreview
                  type={selectedType}
                  data={parsedData}
                  title={title}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setStep('input')}>
                Back
              </Button>
              <Button onClick={handleSubmit}>Create Chart</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
