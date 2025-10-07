import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type Language = 'ru' | 'en' | 'cn';

const translations = {
  ru: {
    title: '3D ПЕЧАТЬ НА ЗАКАЗ',
    subtitle: 'Профессиональная 3D печать любой сложности',
    upload: 'Загрузить модель',
    calculate: 'Рассчитать стоимость',
    material: 'Материал',
    infill: 'Заполнение',
    quality: 'Качество',
    price: 'Стоимость',
    order: 'Заказать',
    fileFormat: 'Загрузите файл .STL',
    specs: 'Характеристики',
    high: 'Высокое',
    medium: 'Среднее',
    low: 'Низкое',
    pla: 'PLA пластик',
    abs: 'ABS пластик',
    petg: 'PETG пластик',
    resin: 'Фотополимер',
  },
  en: {
    title: '3D PRINTING SERVICE',
    subtitle: 'Professional 3D printing of any complexity',
    upload: 'Upload Model',
    calculate: 'Calculate Price',
    material: 'Material',
    infill: 'Infill',
    quality: 'Quality',
    price: 'Price',
    order: 'Order',
    fileFormat: 'Upload .STL file',
    specs: 'Specifications',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    pla: 'PLA plastic',
    abs: 'ABS plastic',
    petg: 'PETG plastic',
    resin: 'Resin',
  },
  cn: {
    title: '定制3D打印',
    subtitle: '任何复杂度的专业3D打印',
    upload: '上传模型',
    calculate: '计算价格',
    material: '材料',
    infill: '填充',
    quality: '质量',
    price: '价格',
    order: '订购',
    fileFormat: '上传.STL文件',
    specs: '规格',
    high: '高',
    medium: '中',
    low: '低',
    pla: 'PLA塑料',
    abs: 'ABS塑料',
    petg: 'PETG塑料',
    resin: '光敏树脂',
  },
};

const Index = () => {
  const [lang, setLang] = useState<Language>('ru');
  const [file, setFile] = useState<File | null>(null);
  const [material, setMaterial] = useState('pla');
  const [infill, setInfill] = useState('20');
  const [quality, setQuality] = useState('medium');
  const [price, setPrice] = useState<number | null>(null);
  const { toast } = useToast();

  const t = translations[lang];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile && uploadedFile.name.endsWith('.stl')) {
      setFile(uploadedFile);
      toast({
        title: '✓',
        description: uploadedFile.name,
      });
    } else {
      toast({
        title: 'Error',
        description: t.fileFormat,
        variant: 'destructive',
      });
    }
  };

  const calculatePrice = () => {
    if (!file) {
      toast({
        title: 'Error',
        description: t.fileFormat,
        variant: 'destructive',
      });
      return;
    }

    const basePrice = 50;
    const materialMultiplier = { pla: 1, abs: 1.2, petg: 1.3, resin: 1.8 }[material] || 1;
    const qualityMultiplier = { low: 0.8, medium: 1, high: 1.5 }[quality] || 1;
    const infillMultiplier = 1 + parseInt(infill) / 100;

    const calculatedPrice = Math.round(basePrice * materialMultiplier * qualityMultiplier * infillMultiplier);
    setPrice(calculatedPrice);
  };

  const handleOrder = () => {
    if (!price) {
      toast({
        title: 'Error',
        description: t.calculate,
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: '✓',
      description: `${t.order} - $${price}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="absolute top-6 right-6 flex gap-3 z-50">
        {(['ru', 'en', 'cn'] as Language[]).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-4 py-2 rounded-full font-medium transition-all ${
              lang === l
                ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105'
                : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-7xl font-black mb-4 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent tracking-tight">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 font-medium">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <Card className="p-8 bg-white/80 backdrop-blur shadow-xl border-2 hover:shadow-2xl transition-all">
            <div className="aspect-square bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 rounded-2xl flex items-center justify-center mb-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <Icon name="Box" size={120} className="text-primary animate-pulse" />
              </div>
            </div>

            <Label
              htmlFor="file-upload"
              className="flex items-center justify-center gap-3 p-6 border-2 border-dashed border-primary/50 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
            >
              <Icon name="Upload" size={24} className="text-primary group-hover:scale-110 transition-transform" />
              <span className="font-semibold text-lg">{file ? file.name : t.upload}</span>
            </Label>
            <Input
              id="file-upload"
              type="file"
              accept=".stl"
              onChange={handleFileUpload}
              className="hidden"
            />
          </Card>

          <Card className="p-8 bg-white/80 backdrop-blur shadow-xl border-2">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Settings" size={32} className="text-secondary" />
              {t.specs}
            </h2>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold mb-2 block">{t.material}</Label>
                <Select value={material} onValueChange={setMaterial}>
                  <SelectTrigger className="h-14 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pla">{t.pla}</SelectItem>
                    <SelectItem value="abs">{t.abs}</SelectItem>
                    <SelectItem value="petg">{t.petg}</SelectItem>
                    <SelectItem value="resin">{t.resin}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-semibold mb-2 block">
                  {t.infill}: {infill}%
                </Label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  step="10"
                  value={infill}
                  onChange={(e) => setInfill(e.target.value)}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>

              <div>
                <Label className="text-base font-semibold mb-2 block">{t.quality}</Label>
                <Select value={quality} onValueChange={setQuality}>
                  <SelectTrigger className="h-14 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{t.low}</SelectItem>
                    <SelectItem value="medium">{t.medium}</SelectItem>
                    <SelectItem value="high">{t.high}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={calculatePrice}
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-accent to-secondary hover:shadow-xl transition-all"
              >
                <Icon name="Calculator" size={24} className="mr-2" />
                {t.calculate}
              </Button>

              {price && (
                <div className="p-6 bg-gradient-to-r from-primary to-secondary rounded-2xl text-white animate-scale-in">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{t.price}:</span>
                    <span className="text-5xl font-black">${price}</span>
                  </div>
                  <Button
                    onClick={handleOrder}
                    className="w-full mt-4 h-14 text-lg font-bold bg-white text-primary hover:bg-gray-100"
                  >
                    <Icon name="ShoppingCart" size={24} className="mr-2" />
                    {t.order}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
