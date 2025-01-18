const AdSense = () => {
  return (
    <div>
      <ins
        className='adsbygoogle'
        style={{ display: 'block' }}
        data-ad-client='ca-pub-6622218753379872'
        data-ad-slot='9949100685'
        data-ad-format='auto'
        data-full-width-responsive='true'
      />
      <script>
        {`
          (adsbygoogle = window.adsbygoogle || []).push({});
        `}
      </script>
    </div>
  );
};

export default AdSense;
