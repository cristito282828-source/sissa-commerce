import { render, screen } from '@testing-library/react';
import SeasonalBanner from './SeasonalBanner';

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('react-slick', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

describe('SeasonalBanner', () => {
  it('debería renderizar productos reales cuando se entregan al banner', () => {
    const products = [
      {
        id: '1',
        name: 'Espirulina Gold',
        slug: 'espirulina-gold',
        price: '$24.990',
        imageSrc: '/espirulina.png',
      },
      {
        id: '2',
        name: 'Suero Hidratante',
        slug: 'suero-hidratante',
        price: '$19.990',
        imageSrc: '/espirulina2.png',
      },
    ];

    render(<SeasonalBanner products={products} />);

    expect(screen.getByText('Espirulina Gold')).toBeInTheDocument();
    expect(screen.getByText('$24.990')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ver catálogo/i })).toHaveAttribute('href', '/product/espirulina-gold');
  });
});
