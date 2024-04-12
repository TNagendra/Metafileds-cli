import React, { useEffect, useState } from 'react';
import {
  Card,
  Page,
  Layout,
  TextContainer,
  Image,
  Stack,
  Link,
  Text,
} from "@shopify/polaris";
import { useTranslation, Trans } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/products/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(products => {
        setProducts(products);
      })
      .catch(error => {
        setError(error.message);
        console.error('Error fetching products:', error.message);
      });
  }, []);

  return (
    <Page narrowWidth>
      <h1>{t('Welcome to My Shop')}</h1>
      {error && <p>Error: {error}</p>}
      <Layout>
        {products.map(product => (
          <Card key={product.id}>
            <div>
              <Image
                alt={product.title}
                source={product.imageSrc}
              />
              <TextContainer>
                <Stack>
                  <Text>{product.title}</Text>
                  <Text>${product.price}</Text>
                  <Link url={`/products/${product.id}`}>{t('View Details')}</Link>
                </Stack>
              </TextContainer>
            </div>
          </Card>
        ))}
      </Layout>
    </Page>
  );
}
