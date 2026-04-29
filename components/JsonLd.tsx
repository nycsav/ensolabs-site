type JsonLd = Record<string, unknown>;

/**
 * Emit one or more JSON-LD blocks. Each schema gets its own <script>
 * so search engines parse them independently.
 */
export function JsonLd({ schemas }: { schemas: JsonLd[] }) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
